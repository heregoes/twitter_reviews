import { useEffect, useState, useRef } from 'react';
import Reviews from './components/reviews/Reviews';
import Select from 'react-select'
import type { Review, OptionType } from './types';
import logo from './logo.png'
import './App.scss';

const BASE_API_URL = 'https://appfigures.com/_u/jobs/twitter-reviews'

function App() {
  const [ data, setData ] = useState<Review[]>()
  const [ sortedData, setSortedData ] = useState<Review[]>()
  const [ filteredData, setFilteredData ] = useState<Review[]>()
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ apiError, setApiError ] = useState<string>('')
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiError('')
        const response = await fetch(BASE_API_URL)
        const data = await response.json()
        setData(data.reviews)
        sortByDate(data.reviews)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setApiError('An Error Occured, pls check network')
        console.error(error)
      }
    }
    fetchData()
    
  }, [ ])

  const sortByDate = (reviews?: Review[]) => {
    //@ts-ignore
    const sorted = reviews?.sort((a, b):any => new Date(b.date - a.date))
    setSortedData(sorted)
  }

  const options = [
    { value: '', label: 'all'},
    { value: '1.00', label: '1' },
    { value: '2.00', label: '2' },
    { value: '3.00', label: '3' },
    { value: '4.00', label: '4' },
    { value: '5.00', label: '5' }
  ]

  const searchHandler = () => {
    if (!inputEl.current) return
    if (inputEl.current.value !== null) {
      const newList = filteredData?.filter((item:any) => {
        return Object.values(item)
          .join(' ')
          .toLocaleLowerCase()
          //@ts-ignore
          .includes(inputEl.current.value.toLocaleLowerCase())
      })
      setSortedData(newList)
    }
  }

  const filterRatingsHandler = (selectedOption:OptionType | null) => {
    const filteredList = selectedOption?.value === '' ? 
    data : data?.filter((item:Review) => item.stars === selectedOption?.value)
    setFilteredData(filteredList)
    setSortedData(filteredList)
  }

  return (
    <div>
      <h1 className='title'>
        <span>
          <img src={logo} alt='logo'/>
        </span>
        Reviews for Twitter
      </h1>
      <form>
        <input 
          ref={inputEl}
          type="text"
          placeholder='search'
          className='searchInput'
          onChange={searchHandler} />
          <div className='select-filter'>
            <Select
              onChange={(selectedOption) => filterRatingsHandler(selectedOption)}
              options={options}
            />
          </div>
      </form>
      <div className='review-count'>Showing <span>{sortedData?.length}</span> reviews</div>
      { apiError ? <div>{apiError}</div> : null}
      { loading ? <div>Loading...</div> : null }
      { sortedData ? <Reviews data={sortedData} /> : null }
    </div>
  );
}

export default App;
