import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonaryLayout from './MasonaryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams()

  useEffect(() => {
    setIsLoading(true)

    if (categoryId) {
      const query = searchQuery(categoryId)

      client.fetch(query)
        .then((data) => setPins(data))
      setIsLoading(false)
    } else {
      client.fetch(feedQuery)
        .then((data) => setPins(data))
      setIsLoading(false)
    }
  }, [categoryId])

  if (isLoading) {
    return <Spinner message="We are adding new ideas to your feed!" />
  }

  if(!pins?.length) return <h2>No pins awaible</h2>

  return (
    <div>
      {pins && <MasonaryLayout pins={pins} />}
    </div>
  )
}

export default Feed
