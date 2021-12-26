import { v4 } from 'uuid'
import { firestore } from '../database/firebase'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { collection, query } from 'firebase/firestore'
import { Key } from 'react'
import { stringAvatar } from '../utils/stringAvatar'
import { Avatar } from '@mui/material'
import { Orders as OrdersType } from '../types/Orders'

export const Orders = () => {
  const ref = query(collection(firestore, 'sessions'))
  const firestoreQuery = useFirestoreQuery(['sessions'], ref)
  const snapshot = firestoreQuery.data
  return firestoreQuery.isLoading ? (
    <div key={v4()}>Loading...</div>
  ) : (
    <div key={v4()}>
      {snapshot &&
        snapshot.docs.map((docSnapshot: { data: () => any; id: Key | null | undefined }) => {
          const docSnapshotData = docSnapshot.data()
          if (docSnapshotData.hasOwnProperty('orders') && Object.keys(docSnapshotData.orders).length) {
            const data = docSnapshotData.orders as OrdersType
            console.log(data)
            const userId = docSnapshot.id as string
            console.log(userId)
            // const orders = userId && data.orders[userId]?.orders
            const user = data && userId && data[userId].hasOwnProperty('user') && data[userId].user
            const orders = userId && data[userId].orders && data[userId].orders
            return (
              <div key={v4()}>
                {user && Object.keys(user).length !== 0 && (
                  <div key={v4()}>
                    <hr />
                    <Avatar {...stringAvatar(`${user.first_name} ${user.last_name}`)} />
                    <h3>Пользователь {user.username}</h3>
                    <div>ID: {user.id}</div>
                    <div>Полное имя: {`${user.first_name} ${user.last_name}`}</div>
                    <div>Бот: {user.is_bot ? 'да' : 'нет'}</div>
                    <div>Язык: {user.language_code}</div>
                  </div>
                )}
                {user && orders && <h4 key={v4()}>Заказы</h4>}
                {user &&
                  orders &&
                  Object.keys(orders).length !== 0 &&
                  Object.entries(orders).map(([orderId, order]) => {
                    return (
                      order && (
                        <div key={v4()}>
                          <h5>Заказ № {orderId}</h5>
                          {/* <pre key={v4()}>{JSON.stringify(order, null, 2)}</pre> */}
                          <div>Название заказа: {order.title}</div>
                          <div>Дата заказа: {order.date.toISOString}</div>
                          <div>Дата свадьбы: {order.weddingDate}</div>
                          <div>Имена молодоженов: {order.newlyweds}</div>
                          <div>Детали заказа: {order.details}</div>
                          <div>Комментарии к заказу: {order.comments ? order.comments : 'нет'}</div>
                          <div>Длительность видео: {order.duration}</div>
                          <div>Количество камер: {order.numberOfCameras}</div>
                          <div>Количество дронов: {order.numberOfDrones}</div>
                          <div>Предоплата: {order.prepayment}</div>
                          <div>Цена: {order.price ? order.price : 'уточняется'}</div>
                          <div>Начать монтаж: {order.startEdit ? 'да' : 'нет'}</div>
                          <div>Предпочтения по монтажу: {order.editPreferences ? order.editPreferences : 'нет'}</div>
                          <div>Музыка: {order.music ? 'да' : 'нет'}</div>
                          <div>Покраска: {order.colorization ? 'да' : 'нет'}</div>
                          <div>
                            Название файла с ТЗ:{' '}
                            {order.termsOfReference ? order.termsOfReference.file_name : 'нет файла'}
                          </div>
                          <div>Название файла с LUT: {order.lut ? order.lut.file_name : 'нет файла'}</div>
                          <div>
                            Название файла с музыкой: {order.musicFile ? order.musicFile.file_name : 'нет файла'}
                          </div>
                          <div>История заказа: {order.history ? order.history.start : 'нет истории'}</div>
                        </div>
                      )
                    )
                  })}
                {/* {Object.keys(data.orders).length !== 0 && <pre key={v4()}>{JSON.stringify(data.orders, null, 2)}</pre>} */}
              </div>
            )
          } else {
            return null
          }
        })}
    </div>
  )
}
