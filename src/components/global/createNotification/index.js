import { store } from "react-notifications-component";

const createNotification = async ({ type, title, msg, timeout }) => {
  return (
    <>
      {store.addNotification({
        title: title,
        message: msg,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          delay: 0,
          duration: timeout ? timeout : 3000,
          showIcon: true,
          click: true,
        },
      })}
    </>
  );
};
export default createNotification;


// success
// danger
// info
// default
// warning
