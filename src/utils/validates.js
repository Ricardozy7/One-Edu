import ToastContent from "components/toast"

import { toast, Slide } from 'react-toastify'

export const ValidateEmail = inputText => {
    var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
    if (inputText.match(mailformat)) {
      return true;
    }
    else {
      toast.error(
        <ToastContent type={"error"} text={'Endereço de E-mail invalido!'} />,
        { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
      )
      return false;
    }
  }
  


  export const PassValidate = (pass, repeatPass) => {
    if (pass !== repeatPass) {
      toast.error(
        <ToastContent type={"error"} text={'As senhas devem ser iguais!'} />,
        { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
      )
      return false
    }
    if(pass.length === 0){
      toast.error(
        <ToastContent type={"error"} text={'O campo senha está em branco!'} />,
        { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
      )
      return false
    }
    return true
  } 