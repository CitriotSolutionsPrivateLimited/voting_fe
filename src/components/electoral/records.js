import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  Table,
  Tag,
  Breadcrumb,
  Typography,
  Card,
  Empty,
  Divider,
  Alert, Select ,
} from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ClearOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import Header from "../header/header";
import axios from "../../utils/axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DownloadOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

/* Field Wrapper */
const FieldWrapper = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
      {label}
    </label>
    {children}
  </div>
);

const ElectoralRecords = () => {
  const [form, setForm] = useState({
    pollingStation: "",
  });

  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState([]);


  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get("polling-stations");
        setStations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStations();
  }, []);

  /* Disable search until typing */
  const isSearchDisabled = !form.pollingStation.trim();

  const handleSearch = async () => {
    setLoading(true);

    try {
      const res = await axios.post("get-records", form);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleReset = () => {
    setForm({
      pollingStation: "",
    });

    setData([]);
    setSearched(false);
  };

  const handleExport = () => {
    if (!data.length) return;

    const formattedData = data.map((item, index) => ({
       "Serial No": item.serialNumber,
        Name: item.name,
        Age: item.age,
        "Relative Name": item.relativeName,
        Relation: item.relation,
        State: item.state,
        District: item.district,
        Constituency: item.constituency,
        Part: item.part,
        "Polling Station": item.pollingStation,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Records");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
    });

    saveAs(blob, "electoral_records.xlsx");
    };

  const columns = [
     {
      title: "Serial No.",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (v) => <Tag color="orange">{v} yrs</Tag>,
    },
    {
      title: "Relative Name",
      dataIndex: "relativeName",
      key: "relativeName",
    },
    {
      title: "Relation",
      dataIndex: "relation",
      key: "relation",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Constituency",
      dataIndex: "constituency",
      key: "constituency",
    },
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
    },
    {
      title: "Polling Station",
      dataIndex: "pollingStation",
      key: "pollingStation",
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f0f5ff_0%,#e8f4fd_50%,#f0fdf4_100%)]">
      <Header />

      <div className="max-w-[1280px] mx-auto px-4 py-7">
        {/* Breadcrumb */}
        <Breadcrumb
          className="mb-5"
          items={[
            {
              title: (
                <Link
                  to="/home"
                  className="!text-blue-500 flex items-center gap-1"
                >
                  <HomeOutlined /> Home
                </Link>
              ),
            },
            {
              title: (
                <span className="text-slate-700 font-semibold">
                  Electoral Records
                </span>
              ),
            },
          ]}
        />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileSearchOutlined />
            Electoral Records
          </h1>

          <p className="text-slate-500">
            Search voter records using EPIC number or School
          </p>
        </div>

        {/* Search Card */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase text-slate-400">
              Search
            </span>
            <Divider className="!m-0 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldWrapper label="Polling Station / School">
              <Select
                showSearch
                placeholder="Select Polling Station"
                value={form.pollingStation || undefined}
                onChange={(value) =>
                  setForm({
                    ...form,
                    pollingStation: value || "",
                  })
                }
                allowClear
                optionFilterProp="children"
                className="w-full"
              >
                {stations.map((station) => (
                  <Option key={station} value={station}>
                    {station}
                  </Option>
                ))}
              </Select>
            </FieldWrapper>
          </div>

          {/* Helper + Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            {/* Helper Alert */}
            <div className="w-full sm:w-auto">
              {isSearchDisabled ? (
                <Alert
                  message="Start typing Polling Station to enable search"
                  type="info"
                  showIcon
                  className="!py-1"
                />
              ) : (
                <Alert
                  message="Ready to search records"
                  type="success"
                  showIcon
                  className="!py-1"
                />
              )}
            </div>

            <div className="flex gap-3">
              <Button icon={<ClearOutlined />} onClick={handleReset}>
                Clear
              </Button>

              <Button
                type="primary"
                icon={<SearchOutlined />}
                loading={loading}
                disabled={isSearchDisabled}
                onClick={handleSearch}
              >
                Search Records
              </Button>
            </div>
          </div>
        </Card>

        {/* Empty */}
        {searched && !loading && data.length === 0 && (
          <Card>
            <Empty description="No records found" />
          </Card>
        )}

        {/* Table */}
        {!loading && data.length > 0 && (
          <Card
            title={
                <div className="flex items-center justify-between w-full">
                <span className="font-semibold">
                    Records Found: {data.length}
                </span>

                <Button
                    icon={<DownloadOutlined />}
                    onClick={handleExport}
                    disabled={!data.length}
                >
                    Export Excel
                </Button>
                </div>
            }
            >
            <Table
                dataSource={data.map((item, i) => ({
                    ...item,
                    key: i,
                }))}
                columns={columns}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: false,
                    showTotal: (total, range) =>
                    `Showing ${range[0]}–${range[1]} of ${total} records`,
                }}
                scroll={{ x: "max-content" }}
                />
          </Card>
        )}
      </div>
    </div>
  );
};

export default ElectoralRecords;