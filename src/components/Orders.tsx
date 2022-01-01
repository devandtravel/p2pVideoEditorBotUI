import { v4 } from 'uuid'
import { firestore } from '../database/firebase'
import { useFirestoreQuery } from '@react-query-firebase/firestore'
import { collection, query } from 'firebase/firestore'
import { Key } from 'react'
import { stringAvatar } from '../utils/stringAvatar'
import { Avatar, Divider, Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { Orders as OrdersType } from '../types/Orders'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined'

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
            console.log('data:', data)
            const userId = docSnapshot.id as string
            console.log('userId:', userId)
            const user = data && userId && data[userId] && data[userId].hasOwnProperty('user') && data[userId].user
            const orders =
              data && userId && data[userId] && data[userId].hasOwnProperty('orders') && data[userId].orders
            return (
              <div key={v4()}>
                {user && Object.keys(user).length !== 0 && (
                  <>
                    <Divider>
                      <SelfImprovementOutlinedIcon />
                    </Divider>
                    <Accordion sx={{ mt: 1 }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel2a-content'
                        id='panel2a-header'>
                        <Avatar {...stringAvatar(`${user.first_name} ${user.last_name}`)} />
                        <Typography sx={{ color: 'text.secondary', ml: 2, display: 'flex', alignItems: 'center' }}>
                          Пользователь {user.username}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>ID: {user.id}</Typography>
                        <Typography>Полное имя: {`${user.first_name} ${user.last_name}`}</Typography>
                        <Typography>Бот: {user.is_bot ? 'да' : 'нет'}</Typography>
                        <Typography>Бот: {user.is_bot ? 'да' : 'нет'}</Typography>
                        <Typography>Язык: {user.language_code}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
                {user &&
                  orders &&
                  Object.keys(orders).length !== 0 &&
                  Object.entries(orders).map(([orderId, order]) => {
                    return (
                      order && (
                        <Accordion key={v4()}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel2a-content'
                            id='panel2a-header'>
                            <Typography sx={{ color: 'text.secondary' }}>Заказ {orderId}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>Название заказа: {order.title}</Typography>
                            <Typography>Дата заказа: {order.date.toISOString}</Typography>
                            <Typography>Дата свадьбы: {order.weddingDate}</Typography>
                            <Typography>Имена молодоженов: {order.newlyweds}</Typography>
                            <Typography>Детали заказа: {order.details}</Typography>
                            <Typography>Комментарии к заказу: {order.comments ? order.comments : 'нет'}</Typography>
                            <Typography>Длительность видео: {order.duration}</Typography>
                            <Typography>Количество камер: {order.numberOfCameras}</Typography>
                            <Typography>Количество дронов: {order.numberOfDrones}</Typography>
                            <Typography>Предоплата: {order.prepayment}</Typography>
                            <Typography>Цена: {order.price ? order.price : 'уточняется'}</Typography>
                            <Typography>Начать монтаж: {order.startEdit ? 'да' : 'нет'}</Typography>
                            <Typography>
                              Предпочтения по монтажу: {order.editPreferences ? order.editPreferences : 'нет'}
                            </Typography>
                            <Typography>Музыка: {order.music ? 'да' : 'нет'}</Typography>
                            <Typography>Покраска: {order.colorization ? 'да' : 'нет'}</Typography>
                            <Typography>
                              Название файла с ТЗ:{' '}
                              {order.termsOfReference ? order.termsOfReference.file_name : 'нет файла'}
                            </Typography>
                            <Typography>
                              Название файла с LUT: {order.lut ? order.lut.file_name : 'нет файла'}
                            </Typography>
                            <Typography>
                              Название файла с музыкой: {order.musicFile ? order.musicFile.file_name : 'нет файла'}
                            </Typography>
                            <Typography>
                              История заказа: {order.history ? order.history.start : 'нет истории'}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
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
