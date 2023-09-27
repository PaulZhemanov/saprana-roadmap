import { ChangeEvent } from "react"
import { TFilterValues } from "../App"
import AddItemForm from "./AddItemForm"
import EditableSpan from "./EditableSpan"
import { Button, Checkbox, IconButton } from "@material-ui/core"
import styled from "@emotion/styled"
import { Tag } from "./Tag"


import { Row } from "./Flex"
import bin from "../assets/Bin.svg"
import SizedBox from "./SizeBox"
const Body = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 20px;
  /* width: 423px; */
  /* height: 100vh; */
  background: #f3f5f6;
  /* flex: 1; */
  align-items: stretch;
  /* width: 100%; */

  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 10px 0px 0px rgba(0, 0, 0, 0.15);
`

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 25px 40px 25px;
  width: 423px;
  /* height: 100vh; */
  background: #f3f5f6;
  /* flex: 1; */
  justify-content: start;
  /* align-items: center; */
`
const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 25px 40px 25px;
  /* width: 423px; */
  background: #f3f5f6;
  /* flex: 1; */
  justify-content: start;
  /* align-items: center; */
`
const StyledRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
`
const Bin = styled.div`
  background: url(${bin});
  width: 25px;
  height: 25px;
`
const StyledAddItemForm = styled(AddItemForm)`
  color: #313131;
  font-family: Open Sans;
  font-style: normal;
  line-height: normal;
`

export type TTask = {
  id: string
  title: string
  isDone: boolean
}
interface IProps {
  id: string
  title: string
  tasks: Array<TTask>
  filter: TFilterValues
  changeFilter: (todolistId: string, value: TFilterValues) => void
  onChangeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void
  onChangeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void
  onRemoveTodoList: (todolistId: string) => void
  onChangeTodolistTitle: (todolistId: string, newTitle: string) => void
  onRemoveTask: (todolistId: string, id: string) => void
  onAddTask: (todolistId: string, title: string) => void
}

function Todolist(props: IProps) {
  const onAllClickHandler = () => {
    props.changeFilter(props.id, "all")
  }
  const onActiveClickHandler = () => {
    props.changeFilter(props.id, "active")
  }
  const onCompletedClickHandler = () => {
    props.changeFilter(props.id, "completed")
  }

  const onRemoveTodoList = () => {
    props.onRemoveTodoList(props.id)
  }

  const onChangeTodolistTitle = (newTitle: string) => {
    props.onChangeTodolistTitle(props.id, newTitle)
  }

  const onAddTask = (title: string) => {
    props.onAddTask(props.id, title)
  }

  const onRemoveTask = (id: string) => props.onRemoveTask(props.id, id)

  const onChangeTaskStatusHandler = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => props.onChangeTaskStatus(props.id, id, e.currentTarget.checked)

  const Span = styled(EditableSpan)`
    font-size: 100px;
    font-weight: 600;
    opacity: 0.8;
  `
  return (
    <Root>
      <StyledRow>
        <Span title={props.title} onChange={onChangeTodolistTitle} />
        <Bin onClick={onRemoveTodoList} />
      </StyledRow>
      <SizedBox height={20} />
      <StyledAddItemForm onAddItem={onAddTask} />
      <SizedBox height={20} />

      <Row>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
          size="small"
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
          color="primary"
          size="small"
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
          color="secondary"
          size="small"
        >
          Completed
        </Button>
      </Row>
      <SizedBox height={20} />

      {props.tasks.map((t) => {
        //todo remove from here
        const onChangeTaskTitleHandler = (newValue: string) =>
          props.onChangeTaskTitle(t.id, newValue, props.id)

        return (
          <StyledBody>
            <Body>
              <Row alignItems="center" justifyContent="space-between">
                <EditableSpan
                  title={t.title}
                  onChange={onChangeTaskTitleHandler}
                />
                <Bin onClick={() => onRemoveTask(t.id)} />
              </Row>
              <SizedBox height={20} />

              <Row alignItems="center" justifyContent="space-between">
                <Tag>Critical</Tag>
                <Checkbox
                  checked={t.isDone}
                  onChange={(e: any) => onChangeTaskStatusHandler(e, t.id)}
                  size="small"
                />
              </Row>
            </Body>
          </StyledBody>
        )
      })}
    </Root>
  )
}

export default Todolist
