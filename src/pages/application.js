import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import Input from '../library/input';
import styled from 'styled-components'

// function validateEmail(email) {
//   return re.test(String(email).toLowerCase());
// }

// const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const FlexContainer = styled.div`
  display: flex;
  padding-left: 25px;
  padding-right: 25px;
  width: 100%;
  justify-content: center;
  margin-top: 15px;
`;


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
      <div>
        
      </div>
      <form onSubmit={handleSubmit(postData)}>
        <div
          style={{
            maxWidth: '1200px',
            paddingLeft: '45px',
            paddingRight: '30px',
            margin: 'auto',
          }}
        >
          <div
            style={{
              marginTop: '25px',
              fontWeight: '400',
              fontSize: '35px'
            }}
          >
            Enter your Details
          </div>
          <FlexContainer marginTop="100px">
            <div style={{ width: '47.5%', marginTop: '10px' }}>
              <Input
                name="name"
                placeholder="Name"
                type='text'
                register={register}
              />  
            </div>
            <div style={{ width: '47.5%', marginLeft: '30px', marginTop: '10px' }}>
              <Input
                name="email"
                placeholder="Email"
                type='text'
                register={register}
              />
            </div>
          </FlexContainer>
          <FlexContainer>
            <div style={{ width: '47.5%' }}>
              <Input
                name="birthday"
                placeholder="Birthday"
                type='text'
                register={register}
              />
            </div>
            <div style={{ width: '47.5%', marginLeft: '30px' }}>
              <Input
                name="address"
                placeholder="Address"
                type='text'
                register={register}
              />
            </div>
          </FlexContainer>
          <FlexContainer>
            <div style={{ width: '47.5%' }}>
              <Input
                name="requested_amount"
                placeholder="Requested Amount"
                type='number'
                register={register}
              />
            </div>
            <div style={{ width: '47.5%', marginLeft: '30px' }}>
              <Input
                name="ssn"
                placeholder="SSN"
                type='number'
                register={register}
              />
            </div>
          </FlexContainer>
          <FlexContainer>
            <div style={{ width: '47.5%' }}>
              <Input
                name="loan_purpose"
                placeholder="What’s your loan purpose?"
                type='string'
                register={register}
              />
            </div>
            <div style={{ width: '47.5%', marginLeft: '30px' }}>
              <Input
                name="phone_number"
                placeholder="Phone Number"
                type='string'
                register={register}
              />
            </div>
          </FlexContainer>
          <FlexContainer>
            <div style={{ width: '47.5%' }}>
              <Input
                name="education"
                placeholder="What’s your highest level of education?"
                type='string'
                register={register}
              />
            </div>
            <div style={{ width: '47.5%', marginLeft: '30px' }}>
              <Input
                name="income_source"
                placeholder="What’s your primary source of income?"
                type='string'
                register={register}
              />
            </div>
          </FlexContainer>
          <FlexContainer>
            <div style={{ width: '47.5%' }}>
              <Input
                name="savings"
                placeholder="How much do you have in savings"
                type='number'
                register={register}
              />
            </div>
            <div style={{ width: '47.5%', marginLeft: '30px' }}>
              <Input
                name="past_loans"
                placeholder="Have you taken out any new loans in the past 3 months?"
                type='string'
                register={register}
              />
            </div>
          </FlexContainer>
          <FlexContainer>
            <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <Button color="primary" variant="contained" type="submit">Send Application</Button>
            </div>
          </FlexContainer>
        </div>
      </form>
    </>
  )
}

export default Application;