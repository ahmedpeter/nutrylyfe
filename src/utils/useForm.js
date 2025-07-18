import {useState } from 'react'


const useForm = submitCallback => {

    const [inputValues, setState]  = useState({});



    const onSubmitHandler = (e) => {
        if (e) {
          e.preventDefault(); 
        //   submitCallback();
        }
      };


    const onChangeHandler = e => {
        if(!e?.persist){
            setState(inputValues, ({...inputValues, [e?.target.name]: e?.target.value })); 
        }else {
            e?.persist();
            const target = e?.target;
      if (target?.name) {
        setState((inputValues) => ({
          ...inputValues,
          [target.name]: target.value,
        }));
      }
        }
        
    }

    return [inputValues, onChangeHandler, onSubmitHandler];

};

export default useForm;

