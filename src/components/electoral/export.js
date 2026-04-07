import React, { useState } from "react";
import {
  Select,
  Button,
  Card,
  message,
  Breadcrumb,
  Row,
  Col,
  Space,
  Typography,
  Tooltip,
} from "antd";

import Header from "../header/header";
import axios from "../../utils/axios";
import { INDIA_DATA } from "../data/indiadata";
import { Link } from "react-router-dom";

import { HomeOutlined, DownloadOutlined, ClearOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const ExportElectoral = () => {
  const [form, setForm] = useState({
    state: "",
    district: "",
    constituency: "",
  });

  const [loading, setLoading] = useState(false);

  const states = Object.keys(INDIA_DATA).sort();

  const districts = form.state
    ? Object.keys(INDIA_DATA[form.state] || {}).sort()
    : [];

  const constituencies =
    form.state && form.district
      ? [...(INDIA_DATA[form.state]?.[form.district] || [])].sort()
      : [];

  // ✅ Enable button only when all fields selected
  const isFormValid =
    form.state &&
    form.district &&
    form.constituency;

  const handleExport = async () => {
    if (!isFormValid) {
      message.warning(
        "Please select State, District and Constituency"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "export-voters",
        form,
        {
          responseType: "blob",
          timeout: 0
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `voters_${form.constituency}.csv`
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      message.success("Export started successfully");

    } catch (err) {
      console.error(err);
      message.error("Export failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setForm({
      state: "",
      district: "",
      constituency: "",
    });
  };

  const filterOption = (input, option) =>
    option?.children
      ?.toLowerCase()
      .includes(input.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto p-6">

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
                  <HomeOutlined />
                  Home
                </Link>
              ),
            },
            {
              title: (
                <span className="text-slate-700 font-semibold">
                  Export Voters
                </span>
              ),
            },
          ]}
        />

        <Card
          bordered={false}
          className="shadow-md"
        >
          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%" }}
          >

            <div>

              <Title level={4}>
                Export Voter Data
              </Title>

              <Text type="secondary">
                Select location filters and export voter
                data as CSV
              </Text>

            </div>

            <Row gutter={[16, 16]}>

              {/* State */}

              <Col xs={24} md={8}>
                <Select
                  placeholder="Select State"
                  value={form.state || undefined}
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={filterOption}
                  onChange={(v) =>
                    setForm({
                      state: v,
                      district: "",
                      constituency: "",
                    })
                  }
                  style={{ width: "100%" }}
                >
                  {states.map((s) => (
                    <Option key={s}>
                      {s}
                    </Option>
                  ))}
                </Select>
              </Col>

              {/* District */}

              <Col xs={24} md={8}>
                <Select
                  placeholder="Select District"
                  value={form.district || undefined}
                  showSearch
                  allowClear
                  disabled={!form.state}
                  optionFilterProp="children"
                  filterOption={filterOption}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      district: v,
                      constituency: "",
                    })
                  }
                  style={{ width: "100%" }}
                >
                  {districts.map((d) => (
                    <Option key={d}>
                      {d}
                    </Option>
                  ))}
                </Select>
              </Col>

              {/* Constituency */}

              <Col xs={24} md={8}>
                <Select
                  placeholder="Select Constituency"
                  value={form.constituency || undefined}
                  showSearch
                  allowClear
                  disabled={!form.district}
                  optionFilterProp="children"
                  filterOption={filterOption}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      constituency: v,
                    })
                  }
                  style={{ width: "100%" }}
                >
                  {constituencies.map((c) => (
                    <Option key={c}>
                      {c}
                    </Option>
                  ))}
                </Select>
              </Col>

            </Row>

            <Space>

              <Tooltip
                title={
                  !isFormValid
                    ? "Please select State, District and Constituency"
                    : ""
                }
              >
                <Button
                  type={isFormValid ? "primary" : "default"}
                  icon={<DownloadOutlined />}
                  loading={loading}
                  size="large"
                  onClick={handleExport}
                  disabled={!isFormValid}
                >
                  {loading
                    ? "Exporting..."
                    : "Export CSV"}
                </Button>
              </Tooltip>

              <Button
                icon={<ClearOutlined />}
                size="large"
                onClick={handleClear}
              >
                Clear Filters
              </Button>

            </Space>

          </Space>

        </Card>

      </div>
    </div>
  );
};

export default ExportElectoral;