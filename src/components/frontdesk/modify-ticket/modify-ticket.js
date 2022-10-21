import * as React from "react";
import CachedIcon from '@mui/icons-material/Cached';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import BusImage from "../../../assets/imgs/toyota_hiace.jpeg";


const ModifyTicket = () => {

  return (
    <section>
      <section className="page__header">
          <CachedIcon/>
        <h3>Modify Ticket</h3>
      </section>
      <div className="s-divider"></div>
      
      <section className="modify__tickets flex__normal">
          <div className="tickets">

          <div className="h-70">
              <input type="text" placeholder="Search ticket number" className="modify__ticket__search"/>
              </div>
          <div className="modify__card">
                  <div className="bus__details pd-30px">
                    <div className="d-flex alc f-10 mt-15 spbtw">
                      <div className="d-flex alc">
                        <div className="user__avatar bg-error">
                          <h3>AO</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Adeze Obi</h4>
                        </div>
                      </div>
                      <p className="fw-bold">#G154MD5</p>
                    </div>
                    <section className="">
                        <p style={{textAlign: 'right'}}>Seat No. P9</p>
                    </section>
                  </div>
                </div>

                <div className="modify__card">
                  <div className="bus__details pd-30px">
                    <div className="d-flex alc f-10 mt-15 spbtw">
                      <div className="d-flex alc">
                        <div className="user__avatar bg-error">
                          <h3>AM</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Alice Mbatsav</h4>
                        </div>
                      </div>
                      <p className="fw-bold">#G154MD5</p>
                    </div>
                    <section className="">
                        <p style={{textAlign: 'right'}}>Seat No. P9</p>
                    </section>
                  </div>
                </div>

                <div className="modify__card">
                  <div className="bus__details pd-30px">
                    <div className="d-flex alc f-10 mt-15 spbtw">
                      <div className="d-flex alc">
                        <div className="user__avatar bg-error">
                          <h3>PG</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Pharoh Godwin</h4>
                        </div>
                      </div>
                      <p className="fw-bold">#G154MD5</p>
                    </div>
                    <section className="">
                        <p style={{textAlign: 'right'}}>Seat No. P9</p>
                    </section>
                  </div>
                </div>
                <div className="modify__card">
                  <div className="bus__details pd-30px">
                    <div className="d-flex alc f-10 mt-15 spbtw">
                      <div className="d-flex alc">
                        <div className="user__avatar bg-error">
                          <h3>AP</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Ahmed Peter</h4>
                        </div>
                      </div>
                      <p className="fw-bold">#G154MD5</p>
                    </div>
                    <section className="">
                        <p style={{textAlign: 'right'}}>Seat No. P9</p>
                    </section>
                  </div>
                </div>
                <div className="modify__card">
                  <div className="bus__details pd-30px">
                    <div className="d-flex alc f-10 mt-15 spbtw">
                      <div className="d-flex alc">
                        <div className="user__avatar bg-error">
                          <h3>BJ</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Benedict Juliet</h4>
                        </div>
                      </div>
                      <p className="fw-bold">#G154MD5</p>
                    </div>
                    <section className="">
                        <p style={{textAlign: 'right'}}>Seat No. P9</p>
                    </section>
                  </div>
                </div>
                <div className="modify__card">
                  <div className="bus__details pd-30px">
                    <div className="d-flex alc f-10 mt-15 spbtw">
                      <div className="d-flex alc">
                        <div className="user__avatar bg-error">
                          <h3>SP</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Stacey Peter</h4>
                        </div>
                      </div>
                      <p className="fw-bold">#G154MD5</p>
                    </div>
                    <section className="">
                        <p style={{textAlign: 'right'}}>Seat No. P9</p>
                    </section>
                  </div>
                </div>
                <div className="modify__card">
                  <div className="bus__details pd-30px">
                    <div className="d-flex alc f-10 mt-15 spbtw">
                      <div className="d-flex alc">
                        <div className="user__avatar bg-error">
                          <h3>FP</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Fortune Peter</h4>
                        </div>
                      </div>
                      <p className="fw-bold">#G154MD5</p>
                    </div>
                    <section className="">
                        <p style={{textAlign: 'right'}}>Seat No. P9</p>
                    </section>
                  </div>
                </div>
          </div>
          
          <div className="ticket__content">
          <section className="d-flex">
                <div className="d-flex alc f-10 mt-15 spbtw content__left">
                      <div className="d-flex alc" style={{marginRight: '10px'}}>
                        <div className="user__avatar bg-error">
                          <h3>AO</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Adeze Obi</h4>
                        </div>
                      </div>
                      <p className="fw-bold">#G154MD5</p>
                    </div>

                    <div className="d-flex alc f-10 mt-15 spbtw content__right">
                      <div className="d-flex alc content__stepper">
                        <input type="radio" checked style={{accentColor: '#4475f3'}} />
                        <input type="radio" checked style={{accentColor: 'grey'}}/>
                        <input type="radio" checked style={{accentColor: 'grey'}}/>
                      </div>
                      <button className="btn btn-primary p-25">
                        Next
                      </button>
                    </div>

                    
            </section>
                    <section className="flex__normal space-even alc my-40">
      <section className="flex-alc group_input  w-60p jcs">
                <div className="pos-rel" style={{width: '50%'}}>
                <label className="mb-7"> From</label>
                <select defaultValue={'default'} className="book_trip_form_input dropdown"
                        name="origin" style={{width: '100%'}}>
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
                    <SyncAltIcon/>
                    <div className="pos-rel ml-15" style={{width: '50%'}}>
                <label className="mb-7"> To</label>
                <select defaultValue={'default'} className="book_trip_form_input dropdown"
                        name="destination" style={{width: '100%'}}>
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
                    <div className="s-divider"></div>


                   
      </section>

      <section className="flex-container" style={{marginTop: '13%'}}>
      <div className="bus__card">
          <div className="bus__image">
          <img src={BusImage} className="w-100"/>
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
          <img src={BusImage} className="w-100"/>
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
          <img src={BusImage} className="w-100"/>
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
          <img src={BusImage} className="w-100"/>
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
          </div>
      </section>

     
    </section>
  );
};

export default ModifyTicket;
