import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import query from "../../helpers/query.ts";

const WalletForm = ({ fundWallet, open, handleModalWalletClose }) => {
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const userInfo = useSelector((state) => state);

  const [depositValues, setDepositValues] = useState({
    deposit_amount: "",
  });
  const [transferValues, setTransferValues] = useState({
    networker_email: "",
    transfer_amount: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDepositValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    if (fundWallet) {
      if (!depositValues.deposit_amount || Number(depositValues.deposit_amount) <= 0) {
        errors.deposit_amount = "Please enter a valid deposit amount";
      }
    } else {
      if (!transferValues.networker_email) {
        errors.networker_email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(transferValues.networker_email)) {
        errors.networker_email = "Invalid email address";
      }
      if (!transferValues.transfer_amount || Number(transferValues.transfer_amount) <= 0) {
        errors.transfer_amount = "Enter a valid transfer amount";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAlert("");

    const bodyData = fundWallet
      ? { amount: depositValues.deposit_amount }
      : {
          email: transferValues.networker_email,
          amount: transferValues.transfer_amount,
        };

    const response = await query({
      method: "POST",
      url: fundWallet ? "/wallet/fund" : "/wallet/transfer-funds",
      bodyData,
      token: userInfo?.user?.user.token,
    });

    setLoading(false);
console.log(response);
    if (response.success) {

        if(fundWallet) {
            let ref = {
            reference : response.data.data.reference
        }
      setAlert(response?.data?.message);
            localStorage.setItem("funding_ref", JSON.stringify(ref) );
            window.location.href = response?.data?.data?.authorization_url;
            handleModalWalletClose();
        } else {
            setAlert(response?.data?.message);
            handleModalWalletClose();
        }
        
     
    } else {
      setAlert(response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleModalWalletClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="close" onClick={handleModalWalletClose}>
              <span aria-hidden="true">&times;</span>
            </button>
            <i className="flaticon-secure-shield d-block"></i>
            <h1>{fundWallet ? "Fund Wallet" : "Transfer Funds"}</h1>
            <p>
              {fundWallet
                ? "Fund your wallet quick and easy"
                : "Transfer from your wallet balance to another networker"}
            </p>

            {alertText && <div className="alert alert-info">{alertText}</div>}

            <form className="needs-validation clearfix" onSubmit={handleSubmit}>
              <div className="form-row" style={{ marginTop: "5%" }}>
                {fundWallet ? (
                  <div className="col-xl-6 col-md-12">
                    <label htmlFor="deposit_amount">Deposit Amount</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        id="deposit_amount"
                        name="deposit_amount"
                        placeholder="5000"
                        value={depositValues.deposit_amount}
                        onChange={handleDepositChange}
                        required
                      />
                    </div>
                    {formErrors.deposit_amount && (
                      <div className="text-danger">{formErrors.deposit_amount}</div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="networker_email">Networker's Email</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          id="networker_email"
                          name="networker_email"
                          value={transferValues.networker_email}
                          onChange={handleTransferChange}
                          required
                        />
                      </div>
                      {formErrors.networker_email && (
                        <div className="text-danger">{formErrors.networker_email}</div>
                      )}
                    </div>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="transfer_amount">Amount to Transfer</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          id="transfer_amount"
                          name="transfer_amount"
                          value={transferValues.transfer_amount}
                          onChange={handleTransferChange}
                          required
                        />
                      </div>
                      {formErrors.transfer_amount && (
                        <div className="text-danger">{formErrors.transfer_amount}</div>
                      )}
                    </div>
                  </>
                )}

                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={handleModalWalletClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary shadow-none ml-2"
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : fundWallet
                      ? "Fund my Wallet"
                      : "Transfer Funds"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WalletForm;
