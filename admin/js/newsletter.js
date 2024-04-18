

let token = localStorage.getItem("token");

const fetchSub = async()=>{
  try {
    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/subscribers", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    console.log(" from sub og : ",data)
    return data;

   
  } catch (error) {
    console.error('Error fetching subscribers:', error);
  }
}

fetchSub()




const newsletters = document.getElementById("newsletter");
// let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

// const fetchSubscribers = () => {
//   subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
//   const subscriberCount = document.getElementById("subscriber-count")
//   subscriberCount.innerHTML = `${subscribers.length} Subscribers`;

// }

async function renderSubscribers() {
  newsletters.innerHTML = ""; 

  const subData = await fetchSub()

  
  subData.data.forEach((sub, index) => {
    const id = `delete-${index}`;
    const html = `<div class="subscriber">
            <img src="../images/me.png" alt="" />
            <div class="data">
              <p>${sub.name}</p>
              <p>${sub.email}</p>
            </div>
            </div>`;
            // <div class="newsletter-acts">
            //   <button id="${id}" class="unsub">Unsubscribe</button>
            // </div>

    newsletters.insertAdjacentHTML("beforeend", html);

    // const unsubscribe = document.getElementById(id);
    // unsubscribe.addEventListener("click", () => {
    //   subscribers.splice(index, 1);
    //   localStorage.setItem("subscribers", JSON.stringify(subscribers));
    //   renderSubscribers(); 
    //   fetchSubscribers();
    // });
  });
}

renderSubscribers();
