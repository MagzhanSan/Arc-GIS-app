import { IGood, IModalOpen } from '../../utils/item.interface'
import NoDataShopDetails from './NoDataShopDetails'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
	Tooltip,
	Typography,
} from '@mui/material'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

interface ITodo extends IModalOpen {
	data: IGood[]
	name: string
	id: number
}

const ProductItem: FC<{
	product: IGood
	handleRemoveItem: Function
	handleRemoveAll: Function
}> = ({ product, handleRemoveItem, handleRemoveAll }) => (
	<ListItem key={product.name}>
		<ListItemText primary={product.name} />
		<ListItemText
			primary={
				<Box display={'flex'} alignItems={'center'} gap={1}>
					{product.price} tg
					<Tooltip title='Remove' followCursor style={{ cursor: 'pointer' }}>
						<div style={{ position: 'relative', cursor: 'pointer' }}>
							<RemoveCircleOutlineIcon
								onClick={() =>
									handleRemoveItem(product.name, product.count, product.price)
								}
							/>
							<span
								style={{
									position: 'absolute',
									right: '-5px',
									top: '-5px',
									color: 'white',
									backgroundColor: '#1976d2',
									borderRadius: '50%',
									padding: '0 5px',
									fontSize: '10px',
								}}
							>
								{product.count}
							</span>
						</div>
					</Tooltip>
					<Tooltip
						followCursor
						title='Delete all'
						style={{ cursor: 'pointer' }}
						onClick={() => handleRemoveAll(product.name)}
					>
						<DeleteIcon />
					</Tooltip>
				</Box>
			}
			style={{ display: 'flex', justifyContent: 'end' }}
		/>
	</ListItem>
)

const Todo: FC<ITodo> = ({ id, name, data, handleOpen }) => {
	const [todo, setTodo] = useState<IGood[]>([])
	const [todos, setTodos] = useState([])

	console.log(id)
	useEffect(() => {
		if (todo.length > 0) {
			if (handleOpen) {
				handleOpen()
			}
		}
	}, [id])

	const handleAddItem = useCallback(
		(productName: string, productPrice: number) => {
			setTodo(prevTodo => {
				const isProductExist = prevTodo.find(item => item.name === productName)
				if (isProductExist) {
					return prevTodo.map(item =>
						item.name === productName
							? {
									...item,
									count: item.count ? item.count + 1 : 2,
									price: item.price + productPrice,
							  }
							: item
					)
				}
				return [
					...prevTodo,
					{ name: productName, price: productPrice, count: 1 },
				]
			})
		},
		[]
	)

	const handleRemoveAll = useCallback((productName: string) => {
		setTodo(prevTodo =>
			prevTodo.filter(product => product.name !== productName)
		)
	}, [])

	const handleRemoveItem = useCallback(
		(
			productName: string,
			productCount: number | undefined,
			productPrice: number
		) => {
			if (productCount && productCount > 1) {
				setTodo(prevTodo =>
					prevTodo.map(product =>
						product.name === productName
							? {
									...product,
									count: productCount - 1,
									price: productPrice - product.price / productCount,
							  }
							: product
					)
				)
			} else {
				handleRemoveAll(productName)
			}
		},
		[handleRemoveAll]
	)

	const handleConvertToJson = useCallback((myObject: object) => {
		const finalObject = {
			id,
			name,
			data: myObject,
		}
		const jsonString = JSON.stringify(finalObject)
		setTodo([])
		console.log(jsonString)
	}, [])

	const todoList = useMemo(
		() =>
			todo.length < 1 ? (
				<NoDataShopDetails />
			) : (
				todo.map((product: IGood) => (
					<ProductItem
						key={product.name}
						product={product}
						handleRemoveItem={handleRemoveItem}
						handleRemoveAll={handleRemoveAll}
					/>
				))
			),
		[todo, handleRemoveItem, handleRemoveAll]
	)

	return (
		<>
			<List component='nav' aria-label='goods list'>
				{data &&
					data.map(product => (
						<ListItem key={product.name}>
							<ListItemText primary={product.name} />
							<ListItemText
								primary={
									<Box display={'flex'} alignItems={'center'} gap={1}>
										{product.price} tg
										<Tooltip
											title='Add'
											followCursor
											style={{ cursor: 'pointer' }}
										>
											<AddIcon
												onClick={() => {
													handleAddItem(product.name, product.price)
												}}
											/>
										</Tooltip>
									</Box>
								}
								style={{ display: 'flex', justifyContent: 'end' }}
							/>
						</ListItem>
					))}
			</List>
			<Divider />
			<Typography variant='h6' color='black' fontWeight={'bold'}>
				Selected todo
			</Typography>
			<List component='nav' aria-label='goods list'>
				{todoList}
			</List>
			{todo.length > 0 && (
				<Button variant='contained' onClick={() => handleConvertToJson(todo)}>
					Сохранить
				</Button>
			)}
		</>
	)
}

export default Todo
