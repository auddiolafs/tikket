import React, { Component } from 'react'
import { withRouter } from "react-router";
import _ from 'lodash'
import { Table, Container, Loader, Icon, Button } from 'semantic-ui-react'
import moment from 'moment';
import { Link } from 'react-router-dom'
import './TicketList.css'

class TicketList extends Component {
  state = {
    column: null,
    data: [],
    direction: null,
  }

  // componentDidMount: function
  // @setState data: props.tickets
  componentDidMount() {
    this.setState({
      data: this.props.tickets
    })
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  handleClick = (id) => {
    this.props.history.push("/ticket/" + id);
  }

  // render: function
  // @return jsx
  render() {
    const { column, data, direction } = this.state

    // Condition: while data is undefined, a loader is displayed.
    if (data === undefined) {
      return <Loader />
    }
    return (
      <Container>
        <Button.Group labeled icon color='blue' floated='right'>
          <Button as={Link} to='/ticket/new' labelPosition='left' icon='plus' content='Ný beiðni' />
        </Button.Group>
        <Table color="orange" sortable compact fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                width={3}
                sorted={column === 'authorFirstName' ? direction : null}
                onClick={this.handleSort('authorFirstName')}
              >
                Nafn
            </Table.HeaderCell>
              <Table.HeaderCell
                width={1}
                sorted={column === 'selectedOption' ? direction : null}
                onClick={this.handleSort('selectedOption')}
              >

              </Table.HeaderCell>
              <Table.HeaderCell
                width={5}
                sorted={column === 'title' ? direction : null}
                onClick={this.handleSort('title')}
              >
                Lýsing
              </Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                textAlign='right'
                sorted={column === 'phone' ? direction : null}
                onClick={this.handleSort('phone')}
              >
                Sími
            </Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                textAlign='right'
                sorted={column === 'created' ? direction : null}
                onClick={this.handleSort('created')}
              >
                Stofnað
            </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(ticket => {
              return (
                <Table.Row key={ticket.id} positive={ticket.solved} warning={ticket.priority && !ticket.solved} onClick={() => this.handleClick(ticket.id)}>
                  <Table.Cell>{ticket.name}</Table.Cell>
                  <Table.Cell>
                    <Icon name={ticket.selectedOption} />

                  </Table.Cell>
                  <Table.Cell>{ticket.priority && !ticket.solved ? <Icon name={'attention'} /> : null}{ticket.title}</Table.Cell>
                  <Table.Cell textAlign='right'>{ticket.phone}</Table.Cell>
                  <Table.Cell textAlign='right'>{moment(ticket.createdAt.toDate()).locale('is').calendar()}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default withRouter(TicketList);