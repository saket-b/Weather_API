import React, { useEffect, useState } from 'react'

const Home = (props) => {

  const [City, setCity] = useState("");
  const [data, setData] = useState({ "main": "", "description": "", "temp": "", "temp_min": "", "temp_max": "" })
  // let api = 'https://api.openweathermap.org/data/2.5/weather?&appid=2f1572fd71f9ac0d521ef5436abfbf04';
  //let api2 = 'http://api.weatherstack.com/current? access_key = 259feb398e49f3cc999fc2b65799ae97 & query = New York'
  //  const [data, setData] = useState(null);



  const LoadData = async (newcity) => {

    if (newcity.length === 0) {
      setData({ "main": "", "description": "", "temp": "", "temp_min": "", "temp_max": "" })
      props.handleALert(" Please Enter city name", "warning")
      
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${newcity},in&APPID=2f1572fd71f9ac0d521ef5436abfbf04`

    let response = await fetch(url);
    let json = await response.json();
    if (json['cod'] === '404') {
      setData({ "main": "", "description": "", "temp": "", "temp_min": "", "temp_max": "" })
      props.handleALert(json["message"], "warning")
      return;
    }

    console.log(json);
    setData({
      "main": json['weather'][0].main,
      "description": json["weather"][0].description,
      "temp": json['main'].temp,
      "temp_min": json['main'].temp_min,
      "temp_max": json['main'].temp_max
    })

  }

  // useEffect(() => {

  //   LoadData(City);

  //   // eslint-disable-next-line

  // }, [])

  const handleonChange = (e) => {

    setCity(e.target.value);

  }
  const keyDownHandler = (event) => {

    // if(event.key === 'Enter')
    // {
    //   console.log("press enter");
    //   LoadData();
    // }
  }

  const handleOnclick = (event) => {
    event.preventDefault();
    console.log("city =", City);
    LoadData(City);

  }

  document.addEventListener('keydown', keyDownHandler);


  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 mb-3 my-5">
          <h2>Give Whether Codition a/c to City</h2>
          {/* <input type="text" id="myFilter" onChange={handleonChange} className="form-control" placeholder="Search for names.." /> */}
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-3" type="search" onChange={handleonChange} id="search" placeholder="Enter city name" aria-label="Search" />
            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={handleOnclick}>submit</button>
          </form>
        </div>
      </div>
      <div className="row" id="myItems">
        <div className="col-sm-8 mb-3">
          <div className="card">
            <div className="card-body">
              
              <h5 className="card-title">{City}</h5>
              {/* <img src = {props.img} alt = '..'/> */}
              <img className = "center"src="https://img.icons8.com/fluency/48/null/partly-cloudy-day.png" alt = ".."/>
              <p className="card-text"><strong>Main        :{ data.main}</strong> </p>
              <p className="card-text"><strong>Description : {data.description}</strong> </p>
              <p className="card-text"><strong>Temp       : {data.temp?`${(data.temp - 273.15).toPrecision(3)} C`:""} </strong> </p>
              <p className="card-text"><strong>Min_Temp    : {data.temp_min?`${(data.temp_min - 273.15).toPrecision(3)} C`:""} </strong> </p>
              <p className="card-text"><strong>MAX_Temp     : {data.temp_max?`${(data.temp_max - 273.15).toPrecision(3)} C`:""}</strong> </p>
            </div>
          </div>












        </div>
      </div>
    </div>
  )
}

export default Home
