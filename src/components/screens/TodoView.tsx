import { AppDispatch } from '../../store'
import { getById } from '../../store/slices/todoGetByIdSlice'
import { todoListDone } from '../../store/slices/todoListDoneSlice'
import { IGood, ITodoData } from '../../utils/item.interface'
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
import { useDispatch, useSelector } from 'react-redux'

interface ITodoView {
	id: number | undefined
}

const TodoView: FC<ITodoView> = ({ id }) => {
	const [todoData, setTodoData] = useState<ITodoData | null>(null)
	const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
	const todoList = useSelector((state: any) => state.todo.todoList)
	const loading = useSelector((state: any) => state.todo.isLoading)
	const todo = useSelector((state: any) => state.todoById.data)
	const isLoading = useSelector((state: any) => state.todoById.isLoading)
	const error = useSelector((state: any) => state.todoById.error)

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (id) {
			dispatch(getById(id))
		}
	}, [id, todoList])

	useEffect(() => {
		if (error) {
			setTodoData(null)
		} else if (!isLoading) {
			setTodoData(todo)
		}
	}, [todo, isLoading, error])

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckedItems({
			...checkedItems,
			[event.target.name]: event.target.checked,
		})
	}

	const handleDone = () => {
		if (todoData) {
			const updatedData = {
				...todoData,
				data: todoData.data.filter((item: IGood) => !checkedItems[item.name]),
			}
			dispatch(todoListDone({ id: todoData.id, data: updatedData }))
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
						{todoData?.data?.map((value: IGood) => (
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
						<Button variant='contained' disabled={loading} onClick={handleDone}>
							Сделано!
						</Button>
					</Box>
				</>
			)}
		</Box>
	)
}

export default TodoView
