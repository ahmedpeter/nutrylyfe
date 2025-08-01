// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import currency from "../../utils/formatCurrency";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { statesAndLgas } from "../../helpers/states";
import { allBanks } from "../../helpers/banks";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import Loader from "../../utils/loader";
import { useSelector } from "react-redux";
import ConvertPackage from "../../helpers/convertPackages";
import moment from "moment";

const Networkers = () => {
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [addNetworkerModal, setAddNetworkerModal] = useState(false);
  const userInfo = useSelector((state) => state);
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [lgas, setLgas] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [myNetworkList, setMyNetworkList] = useState([]);
  const handleModalClose = () => setAddNetworkerModal(false);
  const [packageList, setPackageList] = useState([]);
  const [allAccounts, setAllAccounts] = useState([]);
  const [selectedNetworker, setSelectedNetworker] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    formik.setFieldValue("state", stateName);
    formik.setFieldValue("lga", ""); // Clear LGA
    const found = statesAndLgas.find((s) => s.state === stateName);
    setLgas(found ? found.lgas : []);
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleBankChange = (e) => {
    const bankName = e.target.value;
    setSelectedBank(bankName);
    formik.setFieldValue("bank", bankName);
    const found = allBanks.find((s) => s.bank === bankName);
  };

  const getLinkedNetworkers = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/profile/hierarchy-all-downline",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setMyNetworkList(response?.data?.data.allDownline);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedNetworker?.name || "",
      email: selectedNetworker?.email || "",
      phone: selectedNetworker?.phone || "",
      position: selectedNetworker?.position || "",
      username: selectedNetworker?.username || "",
      address: selectedNetworker?.address || "",
      package_id: selectedNetworker?.package_id || "",
      ref_id: selectedNetworker?.ref_id || "",
      state: selectedNetworker?.state || "",
      lga: selectedNetworker?.lga || "",
      acct_name: selectedNetworker?.acct_name || "",
      acct_number: selectedNetworker?.acct_number || "",
      bank: selectedNetworker?.bank || "",
      acct_type: selectedNetworker?.acct_type || "",
      user_id: selectedNetworker?.id || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      username: Yup.string().required("Username is required"),
      ref_id: Yup.string().required("Placement ID is required"),
      position: Yup.string().required("Binary position is required"),
      package_id: Yup.string().required("Package type is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const response = await query({
        method: "POST",
        url: isEditMode ? `/profile/update` : "/auth/register/networker",
        bodyData: values,
        token: userInfo?.user?.user.token,
      });
      setLoading(false);

      if (response.success) {
        resetForm();
        getLinkedNetworkers(); // refresh list
        setAddNetworkerModal(false);
        setSelectedNetworker(null);
        setIsEditMode(false);
      } else {
        setAlert(response?.data?.message);
      }
    },
  });
  //   Get all Packages

  const getAllPackages = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    const response = await query({
      method: "GET",
      url: "/account-packages/all",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      getLinkedNetworkers();
      setPackageList(response?.data?.data.packages);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    const response = await query({
      method: "GET",
      url: "/admin/users/all",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      // setAllAccounts(response?.data?.data.packages);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    if(userInfo?.user.user.user_type === "Admin") {
      getAllUsers();
    }
    console.log(userInfo);
    getAllPackages();
    if (selectedNetworker) {
      setSelectedState(selectedNetworker.state);
      const found = statesAndLgas.find(
        (s) => s.state === selectedNetworker.state
      );
      setLgas(found ? found.lgas : []);
      setSelectedBank(selectedNetworker.bank);
    }
  }, [selectedNetworker]);

  return (
    <section>
      <div class="ms-content-wrapper">
        <div class="row">
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>
                      All Networkers{" "}
                      <span class="badge badge-danger">
                        {myNetworkList?.length}
                      </span>
                    </h6>
                    <p>See your direct network</p>
                  </div>
                  <ul
                    class="btn-group btn-group-toggle nav nav-tabs ms-graph-metrics"
                    role="tablist"
                  >
                    <li role="presentation">
                      <a
                        class="btn btn-sm"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="false"
                        onClick={() => setAddNetworkerModal(true)}
                      >
                        {" "}
                        Add a Networker{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {loading && <Loader/>}
              { !loading && (
              <div class="ms-panel-body p-0">
                <div class="tab-content">
                  <div
                    role="tabpanel"
                    class="tab-pane fade in active show"
                    id="b-orders"
                  >
                    <div class="table-responsive">
                      <table class="table table-hover thead-primary">
                        <thead>
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Account Name</th>
                            <th scope="col">Ref ID</th>
                            <th scope="col">Position</th>
                            <th scope="col">Downlines</th>
                            <th scope="col">Username</th>
                            <th scope="col">Package</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Reg. Date</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myNetworkList?.map((netlist, i) => (
                            <>
                            <tr key={netlist.id}>
                              <td>{i + 1}</td>
                              <td className="text-capitalize">{netlist.name}</td>
                              <td>{netlist.my_ref_id}</td>
                              <td className="text-capitalize">{netlist.position}</td>
                              <td className="text-capitalize" title="Click to See" onClick={() => toggleRow(netlist.id)}>
                                  {expandedRow === netlist.id ? "Hide Details" : `${netlist.all_downline?.length} downlines`}
                              </td>
                              <td>{netlist.username}</td>
                              <td>
                                <ConvertPackage
                                  id={netlist.package_id}/>
                              </td>
                              <td>{netlist.phone} <br/> {netlist.email}</td>
                              <td>
                                {moment(netlist.created_at).format("lll")}
                              </td>
                              <td>
                                <div
                                  className="pointer"
                                  onClick={() => {
                                    setSelectedNetworker(netlist);
                                    setIsEditMode(true);
                                    setAddNetworkerModal(true);
                                  }}
                                >
                                  <i class="fas fa-pencil-alt"></i>
                                </div>
                              </td>
                            </tr>


                            {expandedRow === netlist.id &&
                                netlist.all_downline?.map((net, idx) => (
                              <tr key={net.id}>
                              <td>({String.fromCharCode(97 + idx)})</td>
                              <td className="text-capitalize">{net.name}</td>
                              <td>{net.my_ref_id}</td>
                              <td className="text-capitalize">{net.position}</td>
                              <td className="text-capitalize" title="Click to See" onClick={() => toggleRow(net.id)}>
                                  {expandedRow === net.id ? "Hide Details" : `${net.all_downline?.length} downlines`}
                              </td>
                              <td>{net.username}</td>
                              <td>
                                <ConvertPackage
                                  id={net.package_id}/>
                              </td>
                              <td>{net.phone} <br/> {net.email}</td>
                              <td>
                                {moment(net.created_at).format("lll")}
                              </td>
                              <td>
                                <div
                                  className="pointer"
                                  onClick={() => {
                                    setSelectedNetworker(net);
                                    setIsEditMode(true);
                                    setAddNetworkerModal(true);
                                  }}
                                >
                                  <i class="fas fa-pencil-alt"></i>
                                </div>
                              </td>
                            </tr>
                            ))}
                    </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={addNetworkerModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-address"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                onClick={handleModalClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <i className="flaticon-secure-shield d-block"></i>
              <h1> {isEditMode ? "Update Account" : "New Networker"}</h1>
              <p>{isEditMode ? "Complete your account details" : "Add Networkers to your Team and Grow your Net Worth"} </p>

              <form
                className="needs-validation clearfix"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-row" style={{ marginTop: "5%" }}>
                  {/* Full Name */}
                  <div className="col-xl-6 col-md-12">
                    <label htmlFor="name">Member's Full Name</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isEditMode}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-danger">{formik.errors.name}</div>
                    )}
                  </div>

                  {/* Username */}
                  <div className="col-xl-3 col-md-12">
                    <label htmlFor="username">Choose a username</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder=""
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isEditMode}
                      />
                    </div>
                    {formik.touched.username && formik.errors.username && (
                      <div className="text-danger">
                        {formik.errors.username}
                      </div>
                    )}
                  </div>
                   {/* Store Location (State) */}
        <div className="col-xl-3 col-md-12">
        <label htmlFor="state">Store Location (State)</label>
          <div className="input-group">
            <select
              className="form-control"
              id="state"
              name="state"
              onChange={handleStateChange} value={selectedState}
              onBlur={formik.handleBlur}
              required
            > 
            <option value="">Select State</option>
                {statesAndLgas.map(({ state }) => (
                    <option key={state} value={state}>{state}</option>
                ))}

            </select>
          </div>
          {formik.touched.state && formik.errors.state && (
            <div className="text-danger">{formik.errors.state}</div>
          )}
        </div>

{/* LGA */}
<div className="col-xl-3 col-md-12">
          <label htmlFor="lga">Select LGA</label>
          <div className="input-group">
            <select
              className="form-control"
              name="lga"
              value={formik.values.lga}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              id="lga" disabled={!lgas.length}
            >
              <option value="">Select LGA</option>
              {lgas.map((lga) => (
          <option key={lga} value={lga}>{lga}</option>
        ))}
            </select>
          </div>
          {formik.touched.lga && formik.errors.lga && (
            <div className="text-danger">{formik.errors.lga}</div>
          )}
        </div>
{/* NL-567619 */}
                  {/* Placement ID */}
                  {/* {myNetworkList?.length > 0 &&( */}
                  <div className="col-xl-3 col-md-12">
                    <label htmlFor="ref_id">Placement Member Id</label>
                    <div className="input-group">
                      <select
                        className="form-control"
                        id="ref_id"
                        name="ref_id"
                        value={formik.values.ref_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isEditMode}
                      >
                        <option value="">Select an option</option>
                        {myNetworkList?.length > 0 &&
                          myNetworkList?.map((netlist) => (
                            <option key={netlist.id} value={netlist.id}>
                              {netlist.name} - {netlist.my_ref_id}
                            </option>
                          ))}
                      </select>
                    </div>
                    {formik.touched.ref_id && formik.errors.ref_id && (
                      <div className="text-danger">{formik.errors.ref_id}</div>
                    )}
                  </div>


<div className="col-xl-3 col-md-12">
                    <label htmlFor="ref_id">Set your Ref Id</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="ref_id"
                        name="ref_id"
                        placeholder=""
                        value={formik.values.ref_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isEditMode}
                      />
                    </div>
                    {formik.touched.ref_id && formik.errors.ref_id && (
                      <div className="text-danger">
                        {formik.errors.ref_id}
                      </div>
                    )}
                  </div>


                  {/* Binary Position */}
                  <div className="col-xl-3 col-md-12">
                    <label htmlFor="position">Binary Position</label>
                    <div className="input-group">
                      <select
                        className="form-control"
                        id="position"
                        name="position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      >
                        <option value="">Select position</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    {formik.touched.position &&
                      formik.errors.position && (
                        <div className="text-danger">
                          {formik.errors.position}
                        </div>
                      )}
                  </div>

                  {/* Package Type */}
                  <div className="col-xl-4 col-md-12">
                    <label htmlFor="package_id">Select Package Type</label>
                    <div className="input-group">
                      <select
                        className="form-control"
                        id="package_id"
                        name="package_id"
                        value={formik.values.package_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isEditMode}
                      >
                        <option value="">Select an option</option>
                        {packageList?.length > 0 &&
                          packageList?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name} - ({currency(item.price)})
                            </option>
                          ))}
                      </select>
                    </div>
                    {formik.touched.package_id && formik.errors.package_id && (
                      <div className="text-danger">
                        {formik.errors.package_id}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-xl-4 col-md-12">
                    <label htmlFor="email">Please provide an Email</label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="email@faker.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isEditMode}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="col-xl-4 col-md-12">
                    <label htmlFor="phone">Phone</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="234 801 234 567 89"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-danger">{formik.errors.phone}</div>
                    )}
                  </div>

                  {/* Optional Profile */}
                  {isEditMode && (
                    <>
                      <div className="col-xl-6 col-md-12">
                        <label htmlFor="ref_id">State</label>
                        <div className="input-group">
                          <select
                            className="form-control"
                            id="state"
                            name="state"
                            onChange={handleStateChange}
                            value={selectedState}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Select State</option>
                            {statesAndLgas.map(({ state }) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Binary Position */}

                      <div className="col-xl-3 col-md-12">
                        <label htmlFor="position">
                          Local Government Area
                        </label>
                        <div className="input-group">
                          <select
                            className="form-control"
                            name="lga"
                            value={formik.values.lga}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="lga"
                            disabled={!lgas.length}
                          >
                            <option value="">Select LGA</option>
                            {lgas.map((lga) => (
                              <option key={lga} value={lga}>
                                {lga}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-12">
                        <label htmlFor="position">
                          Bank Account Type
                        </label>
                        <div className="input-group">
                          <select
                            className="form-control"
                            name="acct_type"
                            value={formik.values.acct_type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="acct_type"
                          >
                            <option value="Personal">Personal</option>
                            <option value="current">Current</option>
                          </select>
                        </div>
                      </div>
                      {/* Bank Account Name */}
                      <div className="col-xl-4 col-md-12">
                        <label htmlFor="package_id">Bank Account Name</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="acct_name"
                            name="acct_name"
                            placeholder="Adams Babatunde"
                            value={formik.values.acct_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>

                      {/* Account Number */}
                      <div className="col-xl-4 col-md-12">
                        <label htmlFor="account number">Account Number</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="acct_number"
                            name="acct_number"
                            placeholder="1234567890"
                            value={formik.values.acct_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>

                      {/* Bank */}
                      <div className="col-xl-4 col-md-12">
                        <label htmlFor="Bank">Banker</label>
                        <div className="input-group">
                          <select
                            className="form-control"
                            name="bank"
                            value={formik.values.bank}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="bank"
                            disabled={!allBanks.length}
                          >
                            <option value="">Select Bank</option>
                            {allBanks.map((bank) => (
                              <option key={bank} value={bank.name}>
                                {bank.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Ends Optional Profile */}

                      {/* address */}
                      <div className="col-md-12">
                        <label htmlFor="address">Address</label>
                        <div className="input-group">
                          <textarea
                            rows="5"
                            id="address"
                            name="address"
                            className="form-control"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></textarea>
                        </div>
                        {formik.touched.address && formik.errors.address && (
                          <div className="text-danger">
                            {formik.errors.address}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {/* Footer Buttons */}
                  <div className="modal-footer mt-3">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary shadow-none"
                      disabled={loading}
                    >
                      {loading
                        ? "Processing..."
                        : isEditMode
                        ? "Update Account"
                        : "Proceed to Payment"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Networkers;
