import React, {useRef, useState} from 'react';
import {
  Button,
  Divider,
  Input,
  Space,
  Tooltip,
  Table,
  Tag,
} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { MdEdit} from 'react-icons/md';
import ModalForm from '../../modal/Modal';
import UpdateVehicleForm from '../forms/UpdateVehicleForm';
import { FormatDay } from '../../helper/FormateDay';

const VehicleTable = ({VehicleData, loading, reload}) => {
  const [searchedColumn, setSearchedColumn] = useState ('');
  const [searchText, setSearchText] = useState ('');
  const searchInput = useRef (null);
  const [modalOpen, setModalOpen] = useState (false);
  const [modalContent, setModalContent] = useState ([]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm ();
    setSearchText (selectedKeys[0]);
    setSearchedColumn (dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters ();
    setSearchText ('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        searchText
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps ('name'),
      width: '200px',
      key: 'name',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: r => <span>{FormatDay (r)}</span>,
      width: '120px',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      width: '160px',
      key: 'createdAt',
      render: r => <span>{FormatDay (r)}</span>,
    },
    {
      fixed: 'right',
      title: 'Status',
      width: '80px',
      key: 'status',
      render: r => (
        <Tag color={r.status === 'Active' ? 'success' : 'volcano'}>
          {r.status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      width: '100px',
      fixed: 'right',
      key: 'operation',
      render: r => (
        <Space
          style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
        >
          <Tooltip title="Update">
              <Button
                style={{padding: '0', margin: '0'}}
                type="text"
                onClick={() => {
                  setModalOpen (true);
                  setModalContent (r._id);
                }}
              >
                <MdEdit />
              </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <ModalForm
        open={modalOpen}
        close={() => setModalOpen (false)}
        title={<Divider>Update Vehicle</Divider>}
        content={
          <UpdateVehicleForm
            id={modalContent}
            reload={() => reload ()}
            openModalFun={e => setModalOpen (e)}
          />
        }
      />
      <Table
        size="small"
        columns={columns}
        bordered
        scroll={{
          x: 500,
        }}
        pagination={{
          defaultPageSize: 7,
          showSizeChanger: false,
        }}
        dataSource={VehicleData}
        loading={loading}
      />
    </div>
  );
};
export default VehicleTable;
