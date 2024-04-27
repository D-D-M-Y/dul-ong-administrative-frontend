// created popup.tsx file
// installed styled-components module
import styled from 'styled-components';

export const CancelButton = styled.div`
    display: inline-block;
    background: white;
    border-radius: 10px;
    color: #808080;
    font-weight: 500; 
    text-align: center;
    padding: 10px;
    cursor: pointer;
    width: 150px;
    margin-right: 50px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

`
export const DeleteButton = styled.div`
    display: inline-block;
    background: red;
    border-radius: 10px;
    color: white;
    font-weight: 500; 
    text-align: center;
    padding: 10px;
    cursor: pointer;
    width: 150px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

`
const PopupCard = styled.div`
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  background-color: white;
  padding: 40px;
  transform: translateY(-50%);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
`;

type Popup = {
  togglePopup: (event: React.MouseEvent<HTMLElement>) => void;
}
export const Popup = ({ togglePopup }: Popup) => (
  <Overlay>
    <PopupCard>
      <h3 className='font-roboto font-bold'>Delete</h3>
      <p className='font-source-sans-pro mt-4 mb-4'>Are you sure you want to delete this item?</p>
      <CancelButton onClick={togglePopup}>Close</CancelButton>
      <DeleteButton onClick={togglePopup}>Delete</DeleteButton>
    </PopupCard>
  </Overlay>
);