import axios from "axios"
import Swal from "sweetalert2";


const GoogleCallback = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  window.history.replaceState(null, "", "/")
  axios.post(`${process.env.REACT_APP_API_USER}/callback`, { code })
    .then(response => {
      const { token } = response.data;
      sessionStorage.setItem("token", token);
      Swal.fire({
        title: "Login Success",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <main>
      <content>
        <div className="container-CB">
          <div class="loaderGoogle"></div>
        </div>
      </content>
    </main>
  )
}
export default GoogleCallback 