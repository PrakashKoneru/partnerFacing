import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import Input from '../library/input';

// function validateEmail(email) {
//   return re.test(String(email).toLowerCase());
// }

// const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const Application =  () => {
  // watch, errors
  const { register, handleSubmit } = useForm();

  const postData = async (data) => {
     const acceptedData = JSON.parse(localStorage.getItem('acceptedData'));
     const lastApplication = acceptedData[acceptedData.length - 1];
     const newApplicationData = {...(acceptedData[acceptedData.length - 1]), ...data, id: (lastApplication['id'] + 1)}
     localStorage.setItem('acceptedData', JSON.stringify([...acceptedData, newApplicationData]));
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(postData)}>
        <div>
          <Input
            name="name"
            placeholder="Name"
            type='text'
            register={register}
          />
          <Input
            name="email"
            placeholder="Email"
            type='text'
            register={register}
          />
          <Input
            name="address"
            placeholder="Address"
            type='text'
            register={register}
          />
          <Input
            name="ssn"
            placeholder="SSN"
            type='number'
            register={register}
          />
          <Input
            name="requested_amount"
            placeholder="Requested Amount"
            type='number'
            register={register}
          />
          <Button color="primary" variant="contained" type="submit">Send Application</Button>
        </div>
      </form>
    </>
  )
}

export default Application;