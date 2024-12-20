import axios from "axios"



const GoogleCallback = () => {
    const queryString =  window.location.search; 
    const urlParams =  new URLSearchParams(queryString);
    const code = urlParams.get('code');
    window.history.replaceState(null,"","/")
     axios.post(`${process.env.REACT_APP_API_USER}/callback`, {code})
    .then ( response => {
      window.close();
        const { token } = response.data;
        window.opener.postMessage(
        {token},`${process.env.REACT_APP_URI }`)
    })
    .catch((err) => {
      console.log(err);
      });
      
    return(
      <div className="container-CB">
            <div class="loaderGoogle"></div>
      </div>
    )
  }
export default GoogleCallback 