import {useEffect,useState} from 'react';

const FlashMsg = (props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, props.time || 2500);
  }, []);

  return (
    show &&
    <div>
      {props.children}
    </div>
  );
}

export default FlashMsg;