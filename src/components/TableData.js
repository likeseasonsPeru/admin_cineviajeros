import React, {
  useState,
  useEffect
} from 'react'
import {
  useHistory,
  useLocation
} from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

/* 
fields = [
                { key: 'name', _classes: 'font-weight-bold' },
                'registered', 'role', 'status'
              ]
*/

const TableData = ({
    titleTable,
    items,
    fields,
    itemsPerPage,
    scopedSlots,
    linkPage
  }) => {
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)
    const [numberOfPages] = useState(items.length % 2 === 0 ?
      items.length / itemsPerPage < 1 ? 1 : items.length / itemsPerPage :
      Math.trunc(items.length / itemsPerPage) + 1)

    const pageChange = newPage => {
      currentPage !== newPage && history.push(`/${linkPage}?page=${newPage}`)
    }

    useEffect(() => {
      currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    return(
        <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <h3>
              {titleTable}
              </h3>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={items}
              fields={fields}
              hover
              sorter
              //striped
              itemsPerPage={itemsPerPage}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/${linkPage}/${item.id}`)}
              scopedSlots = {scopedSlots}
              horizontalaligment
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={numberOfPages}
              doubleArrows={false} 
              align="center"
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
}

export default React.memo(TableData);