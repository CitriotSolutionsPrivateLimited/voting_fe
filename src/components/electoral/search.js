import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  Input,
  DatePicker,
  Button,
  Table,
  Tag,
  Breadcrumb,
  Typography,
  Card,
  Empty,
  Divider,
} from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ClearOutlined,
  EnvironmentOutlined,
  UserOutlined,
  TeamOutlined,
  IdcardOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Header from "../header/header";
import axios from "../../utils/axios";
import { INDIA_DATA } from "../data/indiadata";

const { Title, Text } = Typography;
const { Option } = Select;

/* ── Shared field wrapper ── */
const FieldWrapper = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
      {label}{" "}
      <span className="text-slate-300 font-normal normal-case tracking-normal">
        (optional)
      </span>
    </label>
    {children}
  </div>
);

const SearchElectoral = () => {
  const [form, setForm] = useState({
    state: "",
    district: "",
    constituency: "",
    name: "",
    relativeName: "",
    dob: "",
  });
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const states = Object.keys(INDIA_DATA);
  const districts = form.state ? Object.keys(INDIA_DATA[form.state] || {}) : [];
  const constituencies =
    form.state && form.district
      ? INDIA_DATA[form.state]?.[form.district] || []
      : [];

  const handleSearch = async () => {
    const anyFilled = Object.values(form).some((v) => v);
    if (!anyFilled) {
      alert("Please enter at least one search field");
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post("search-voter", form);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setSearched(true);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ state: "", district: "", constituency: "", name: "", relativeName: "", dob: "" });
    setData([]);
    setSearched(false);
  };

  /* ── Table Columns ── */
  const columns = [
    {
      title: "#",
      key: "index",
      width: 50,
      fixed: "left",
      render: (_, __, i) => (
        <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-100">
          {i + 1}
        </div>
      ),
    },
    {
      title: "EPIC No.",
      dataIndex: "epicNumber",
      key: "epicNumber",
      width: 130,
      render: (v) => (
        <Tag color="success" className="!font-mono !text-xs !tracking-wide !font-semibold !rounded-md">
          {v}
        </Tag>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (v) => <span className="font-semibold text-slate-800 text-sm">{v}</span>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 76,
      render: (v) => (
        <Tag color="warning" className="!rounded-md !font-semibold">
          {v} yrs
        </Tag>
      ),
    },
    {
      title: "Relative",
      dataIndex: "relativeName",
      key: "relativeName",
      width: 150,
      render: (v) => <span className="text-slate-500 text-sm">{v}</span>,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: 120,
      render: (v) => <span className="text-slate-500 text-sm">{v}</span>,
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      width: 120,
      render: (v) => <span className="text-slate-500 text-sm">{v}</span>,
    },
    {
      title: "Constituency",
      dataIndex: "constituency",
      key: "constituency",
      width: 140,
      render: (v) => <span className="font-medium text-slate-700 text-sm">{v}</span>,
    },
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
      width: 68,
      align: "center",
      render: (v) => <span className="text-slate-500 text-sm">{v}</span>,
    },
    {
      title: "Polling Station",
      dataIndex: "pollingStation",
      key: "pollingStation",
      width: 180,
      render: (v) => <span className="text-slate-500 text-sm">{v}</span>,
    },
    {
      title: "Serial No.",
      dataIndex: "serialNumber",
      key: "serialNumber",
      width: 90,
      align: "center",
      render: (v) => <span className="text-slate-500 text-sm">{v}</span>,
    },
  ];

  return (
  <div className="min-h-screen w-full overflow-x-hidden bg-[linear-gradient(135deg,#f0f5ff_0%,#e8f4fd_50%,#f0fdf4_100%)] font-sans box-border">

    {/* KEEP YOUR STYLE BLOCK (Ant overrides) */}
    <style>{` /* keep your existing styles here unchanged */ `}</style>

    <Header />

    <div className="max-w-[1280px] w-full mx-auto px-4 py-7 box-border">

      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-5"
        items={[
          {
            title: (
              <Link to="/home" className="!text-blue-500 flex items-center gap-1">
                <HomeOutlined /> Home
              </Link>
            ),
          },
          {
            title: (
              <span className="text-slate-700 font-semibold">
                Search Voters
              </span>
            ),
          },
        ]}
      />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2 tracking-tight">
            <FileSearchOutlined className="text-blue-500" />
            Search <span className="text-blue-600">Electoral Roll</span>
          </h1>

          <p className="text-sm text-slate-500">
            Enter criteria to find registered voters
          </p>
        </div>
      </div>

      {/* Search Card */}
      <Card className="se-card shadow-lg border border-slate-200 mb-6">

        {/* Location */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-slate-400 uppercase whitespace-nowrap">
            <EnvironmentOutlined className="text-blue-400" /> Location
          </span>
          <Divider className="!m-0 flex-1 !border-slate-100" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <FieldWrapper label="State">
            <Select
              className="se-select w-full"
              placeholder="Select State"
              value={form.state || undefined}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  state: v || "",
                  district: "",
                  constituency: "",
                }))
              }
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {states.map((s) => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Select>
          </FieldWrapper>

          <FieldWrapper label="District">
            <Select
              className="se-select w-full"
              placeholder="Select District"
              value={form.district || undefined}
              onChange={(v) =>
                setForm({ ...form, district: v || "", constituency: "" })
              }
              disabled={!form.state}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {districts.map((d) => (
                <Option key={d} value={d}>{d}</Option>
              ))}
            </Select>
          </FieldWrapper>

          <FieldWrapper label="Constituency">
            <Select
              className="se-select w-full"
              placeholder="Select Constituency"
              value={form.constituency || undefined}
              onChange={(v) =>
                setForm({ ...form, constituency: v || "" })
              }
              disabled={!form.district}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {constituencies.map((c) => (
                <Option key={c} value={c}>{c}</Option>
              ))}
            </Select>
          </FieldWrapper>
        </div>

        {/* Voter Details */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-slate-400 uppercase whitespace-nowrap">
            <UserOutlined className="text-blue-400" /> Voter Details
          </span>
          <Divider className="!m-0 flex-1 !border-slate-100" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FieldWrapper label="Voter Name">
            <Input
              className="se-input"
              prefix={<UserOutlined className="text-slate-300 text-sm" />}
              placeholder="e.g. Ramesh Kumar"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              allowClear
            />
          </FieldWrapper>

          <FieldWrapper label="Relative's Name">
            <Input
              className="se-input"
              prefix={<TeamOutlined className="text-slate-300 text-sm" />}
              placeholder="Father / Husband / Mother"
              value={form.relativeName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  relativeName: e.target.value,
                }))
              }
              allowClear
            />
          </FieldWrapper>

          <FieldWrapper label="Date of Birth">
            <DatePicker
              className="se-picker"
              placeholder="Select date of birth"
              value={form.dob ? dayjs(form.dob) : null}
              onChange={(date) =>
                setForm((prev) => ({
                  ...prev,
                  dob: date ? dayjs(date).format("DD-MM-YYYY") : "",
                }))
              }
              format="DD-MM-YYYY"
            />
          </FieldWrapper>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
          <Text className="!text-xs !text-slate-400">
            💡 At least one field required to search
          </Text>

          <div className="flex items-center gap-3">
            <Button
              icon={<ClearOutlined />}
              onClick={handleReset}
              className="!rounded-xl !h-10 !px-5 !border-slate-200 !text-slate-500 hover:!border-slate-300 hover:!text-slate-700"
            >
              Clear All
            </Button>

            <Button
              type="primary"
              icon={<SearchOutlined />}
              loading={loading}
              onClick={handleSearch}
              className="!rounded-xl !h-10 !px-7 !font-semibold !border-none"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                boxShadow: "0 4px 16px rgba(59,130,246,0.38)",
              }}
            >
              Search Electoral Roll
            </Button>
          </div>
        </div>
      </Card>

      {/* Empty */}
      {searched && !loading && data.length === 0 && (
        <Card className="se-card shadow-sm border border-slate-200">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 60 }}
            description={
              <div className="text-center mt-2">
                <p className="text-slate-600 font-semibold text-base mb-1">
                  No voters found
                </p>
                <p className="text-slate-400 text-sm">
                  Try adjusting your search criteria
                </p>
              </div>
            }
          />
        </Card>
      )}

      {/* Results */}
      {!loading && data.length > 0 && (
        <Card
          className="se-card shadow-lg border border-slate-200"
          title={
            <div className="flex items-center justify-between w-full py-0.5">
              <div className="flex items-center gap-2">
                <IdcardOutlined className="text-blue-500 text-base" />
                <span className="font-bold text-slate-800 text-base">
                  Search Results
                </span>
              </div>

              <Tag className="!rounded-full !px-3 !font-semibold !text-xs" color="blue">
                {data.length} voter{data.length !== 1 ? "s" : ""} found
              </Tag>
            </div>
          }
        >
          <div className="w-full overflow-x-auto">
            <Table
              className="se-table"
              dataSource={data.map((item, i) => ({ ...item, key: i }))}
              columns={columns}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `Showing ${range[0]}–${range[1]} of ${total} records`,
              }}
              scroll={{ x: "max-content" }}
              size="middle"
            />
          </div>
        </Card>
      )}
    </div>
  </div>
);
};

export default SearchElectoral;