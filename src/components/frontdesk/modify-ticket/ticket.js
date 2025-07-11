import * as React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PhoneIcon from '@mui/icons-material/Phone';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import BusImage from "../../../assets/imgs/toyota_hiace.jpeg";

const Ticket = () => {
  return (
    <>
      <section
        className="flex-alc w-100p jcs"
        style={{ justifyContent: "center" }}
      >
        <section
          className="flex-alc group_input jcs"
          style={{ marginRight: "20px", width: "55%" }}
        >
          <div className="pos-rel" style={{ width: "50%" }}>
            <label className="mb-7"> From</label>
            <select
              defaultValue={"default"}
              className="book_trip_form_input dropdown"
              name="origin"
              style={{ width: "100%" }}
            >
              <option value="default"> Departure Station</option>
              <option value="ABUJA"> ABUJA</option>
              <option value="Lagos"> Lagos</option>
              <option value="Kano"> Kano</option>
              <option value="Benin"> Benin</option>
              <option value="Sokoto"> Sokoto</option>
              <option value="Jos"> Jos</option>
              <option value="Benue"> Benue</option>
              <option value="Imo"> Imo</option>
            </select>
          </div>
          <SyncAltIcon />
          <div className="pos-rel ml-15" style={{ width: "50%" }}>
            <label className="mb-7"> To</label>
            <select
              defaultValue={"default"}
              className="book_trip_form_input dropdown"
              name="destination"
              style={{ width: "100%" }}
            >
              <option value="default"> Arrival Station</option>
              <option value="Abuja"> Abuja</option>
              <option value="Lagos"> Lagos</option>
              <option value="Kano"> Kano</option>
              <option value="Benin"> Benin</option>
              <option value="Kaduna"> Kaduna</option>
              <option value="Enugu"> Enugu</option>
              <option value="Jigawa"> Jigawa</option>
              <option value="Zamfara"> Zamfara</option>
            </select>
          </div>
        </section>

        <section className="flex-alc group_input jcs w-160">
          <div className="pos-rel w-100">
            <label className="mb-7"> Departure Date</label>
            <input
              type="date"
              className="book_trip_form_input w100p"
              name="depart_date"
            />
          </div>
        </section>
      </section>
      <div className="s-divider"></div>

      <section className="flex-container" style={{ marginTop: "13%" }}>
        <div className="bus__card">
          <div className="bus__image">
            <img src={BusImage} className="w-100" />
          </div>
          <div className="bus__details pd-30px">
            <p className="bus__type">Toyota - (Hiace)</p>
            <div className="s-divider my-10"></div>
            <div className="bus__footer flex-container alc">
              <div>
                <h3>15 seats available</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bus__card">
          <div className="bus__image">
            <img src={BusImage} className="w-100" />
          </div>
          <div className="bus__details pd-30px">
            <p className="bus__type">Toyota - (Hiace)</p>
            <div className="s-divider my-10"></div>
            <div className="bus__footer flex-container alc">
              <div>
                <h3>15 seats available</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bus__card">
          <div className="bus__image">
            <img src={BusImage} className="w-100" />
          </div>
          <div className="bus__details pd-30px">
            <p className="bus__type">Toyota - (Hiace)</p>

            <div className="s-divider my-10"></div>
            <div className="bus__footer flex-container alc">
              <div>
                <h3>15 seats available</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Ticket