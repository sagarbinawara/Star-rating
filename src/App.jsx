import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movieData, getMovieData] = useState([]);
  const [searchTerm, updatedTerm] = useState('')
  const [showPop, updatePopup] = useState(false)
  const [starData, updateStarData] = useState([])
  const [emptyStar, clickedStarRate] = useState(0)
  useEffect(() => {
    fetch('https://www.omdbapi.com/?s=time&y=2024&apikey=4a41b347').then((res) => {

         return res.json()
    }).then((res) => {
      console.log(res)
      getMovieData(res?.Search)
    })
  }, [])
  

  const searchApi = () => {
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=4a41b347`).then((res) => {

    return res.json()
    }).then((res) => {
     console.log('res2',res)
     getMovieData(res?.Search)
})
  }

  const onTermChange = (e) => {
    updatedTerm(e?.target?.value)
  }

  const rateFunction = (item) => {
    updatePopup(false)
    clickedStar(0)
    let ob = {
      ...item, emptyStar
    }
    updateStarData([...emptyStar, ob])
  }

  const showPopup = (item) => {
    updatePopup(item)
  }


  const clickedStar = (item) => {
    clickedStarRate(item)
  }

  const starFunction = () => {
    let arr = []
    for (let i = 1; i <= 10; i++) {
      arr.push(<img src={'./public/star.svg'} onClick={() => {
        clickedStar(i)
      }} />)

   
    }
    return arr
  }


  console.log('starData',starData)

  
  return (
    <> 
      {
        showPop && (
          <div className='popup'>
            {
               showPop?.Title
            }
            <div className='starrow'>
            {
               starFunction()
            }
            </div>
            <button onClick={() => {
              rateFunction(false)
            }}>
              Rate
            </button>
            
          </div>
        )
      }
    
      <h3>Star Rating App!</h3>
      <div className='topSection'>
        <input value={searchTerm} onChange={(e) => {
           onTermChange(e)
        }} />
        <button onClick={() => {
            searchApi()
        }}>
          Search
        </button>
      </div>
      <div className='cardContainer'>
        {
          movieData.map((item) => {
            return <>
              <div className='movieCrad'>
                <div className='imageSection'>
                  <img src={ item?.Poster} />
                </div>
                <div className='btmSection'>
                  <div>
                  <h4>
                    {
                      item?.Title
                    }
                  </h4>
                    <img src={'./public/star.svg'} onClick={() => {
                       showPopup(item)
                    }}/>
                    </div>
                  <div>
                    
                    {
                      item?.Year
                    }
                  </div>
                </div>
                </div>
            </>
          })
        }
      </div>
    </>
  );
}

export default App;
