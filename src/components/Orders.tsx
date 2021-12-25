import { v4 } from 'uuid'
import { firestore } from '../database/firebase'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { collection, query } from 'firebase/firestore'
import { Key } from 'react'

export const Orders = () => {
  const ref = query(collection(firestore, 'sessions'))
  const firestoreQuery = useFirestoreQuery(['sessions'], ref)
  const snapshot = firestoreQuery.data
  return firestoreQuery.isLoading ? (
    <>Loading...</>
  ) : (
    <>
      {snapshot &&
        snapshot.docs.map((docSnapshot: { data: () => any; id: Key | null | undefined }) => {
          const data = docSnapshot.data()
          return <pre key={v4()}>{JSON.stringify(data.orders, null, 2)}</pre>
        })}
    </>
  )
}
