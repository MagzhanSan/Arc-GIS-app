import data from '../../data/todo.json'
import { IGood } from '../../utils/item.interface'
import NoDataShopDetails from '../layout/NoDataShopDetails'
import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'

interface ITodoView {
	id: number | undefined
}

interface ITodoData {
	id: number
	name: string
	data: IGood[]
}

const TodoView: FC<ITodoView> = ({ id }) => {
	const [todoData, setTodoData] = useState<ITodoData | null>(null)
	const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		setTimeout(() => {
			const fetchData = () => {
				const resultTodo = data.find((item: ITodoData) => item.id === id)
				if (resultTodo) {
					setTodoData(resultTodo)
				} else {
					setTodoData(null)
				}
				setIsLoading(false)
			}
			fetchData()
		}, 1000)
	}, [id])

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckedItems({
			...checkedItems,
			[event.target.name]: event.target.checked,
		})
	}

	const handleDone = () => {
		if (todoData) {
			setTodoData((prevState: ITodoData | null) => {
				if (prevState) {
					return {
						...prevState,
						data: prevState.data.filter(
							(item: IGood) => !checkedItems[item.name]
						),
					}
				}
				return null
			})
		}
	}

	return (
		<Box
			sx={{
				pt: '64px',
				position: 'absolute',
				top: 0,
				right: 0,
				width: '352px',
				height: '100vh',
				backgroundColor: '#fff',
			}}
		>
			{isLoading ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '200px',
					}}
				>
					<CircularProgress />
				</Box>
			) : !todoData ? (
				<NoDataShopDetails />
			) : (
				<>
					<Typography
						variant='h6'
						style={{ textAlign: 'center', paddingTop: 20 }}
					>
						{todoData.name}
					</Typography>
					<List
						sx={{ width: '100%', maxWidth: 352, bgcolor: 'background.paper' }}
					>
						{todoData.data.map((value: any) => (
							<ListItem key={value.name}>
								<ListItemText
									primary={
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<Box>{value.name}</Box>
											<Box>{value.price} tg</Box>
											<Checkbox
												name={value.name}
												checked={checkedItems[value.name] || false}
												onChange={handleCheckboxChange}
											/>
										</Box>
									}
								/>
							</ListItem>
						))}
					</List>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Button variant='contained' onClick={handleDone}>
							Сделано!
						</Button>
					</Box>
				</>
			)}
		</Box>
	)
}

export default TodoView
