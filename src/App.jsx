import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movieData, getMovieData] = useState([]);
  const [searchTerm, updatedTerm] = useState('')
  const [showPop, updatePopup] = useState(false)
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

  const rateFunction = (e) => {
    updatePopup(e)
  }

  const starFunction = () => {
    let arr = []
    for (let i = 0; i <= 10; i++) {
      arr.push(<img src={'./public/star.svg'} />)

   
    }
    return arr
  }
  return (
    <> 
      {
        showPop && (
          <div className='popup'>
            {
               showPop
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
                       rateFunction(item?.Title)
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
