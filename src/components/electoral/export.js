import React, { useState, useEffect, useRef } from "react";
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
  Progress,
} from "antd";

import Header from "../header/header";
import axios from "../../utils/axios";
import { INDIA_DATA } from "../data/indiadata";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  DownloadOutlined,
  ClearOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const ExportElectoral = () => {
  const [form, setForm] = useState({
    state: "",
    district: "",
    constituency: "",
  });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [exported, setExported] = useState(0);
  const [progressStatus, setProgressStatus] = useState("active"); // "active" | "success" | "exception"

  // Use a ref so stopPolling always has access to the latest intervalId
  const intervalRef = useRef(null);

  const states = Object.keys(INDIA_DATA).sort();

  const districts = form.state
    ? Object.keys(INDIA_DATA[form.state] || {}).sort()
    : [];

  const constituencies =
    form.state && form.district
      ? [...(INDIA_DATA[form.state]?.[form.district] || [])].sort()
      : [];

  const isFormValid =
    form.state && form.district && form.constituency;

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleExport = async () => {
    if (!isFormValid) {
      message.warning("Please select State, District and Constituency");
      return;
    }

    setLoading(true);
    setProgress(0);
    setTotal(0);
    setExported(0);
    setProgressStatus("active");
    stopPolling();

    try {
      // Step 1: Register the export upfront — get exportId and total count
      const initRes = await axios.post("init-export", form);
      const { exportId, total: totalCount } = initRes.data;

      if (!totalCount || totalCount === 0) {
        message.warning("No data found for selected filters");
        setLoading(false);
        return;
      }

      setTotal(totalCount);

      // Step 2: Start polling for progress BEFORE the download begins
      intervalRef.current = setInterval(async () => {
        try {
          const progressRes = await axios.get(`export-progress/${exportId}`);
          const data = progressRes.data;

          const exportedCount = data.exported || 0;
          setExported(exportedCount);

          if (data.total > 0) {
            const percent = Math.min(
              Math.floor((exportedCount / data.total) * 100),
              100
            );
            setProgress(percent);
          }

          if (data.status === "completed") {
            stopPolling();
            setProgress(100);
            setProgressStatus("success");
            message.success("Export completed successfully!");
          }

          if (data.status === "failed") {
            stopPolling();
            setProgressStatus("exception");
            message.error("Export failed on the server.");
          }
        } catch (err) {
          // Silent — don't stop polling on a single failed poll
          console.warn("Progress poll failed:", err);
        }
      }, 1500);

      // Step 3: Trigger the actual CSV download (blocks until file is fully received)
      const res = await axios.post(
        "export-voters",
        { ...form, exportId },
        { responseType: "blob", timeout: 0 }
      );

      // Trigger browser file save
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `voters_${form.constituency}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      stopPolling();
      setProgressStatus("exception");
      message.error("Export failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setForm({ state: "", district: "", constituency: "" });
    setProgress(0);
    setTotal(0);
    setExported(0);
    setProgressStatus("active");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  const filterOption = (input, option) =>
    option?.children?.toLowerCase().includes(input.toLowerCase());

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f0f5ff_0%,#e8f4fd_50%,#f0fdf4_100%)]">
      <Header />

      <div className="max-w-4xl mx-auto p-6">

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

        <Card bordered={false} className="shadow-md">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>

            <div>
              <Title level={4}>Export Voter Data</Title>
              <Text type="secondary">
                Select location filters and export voter data as CSV
              </Text>
            </div>

            <Row gutter={[16, 16]}>

              <Col xs={24} md={8}>
                <Select
                  placeholder="Select State"
                  value={form.state || undefined}
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={filterOption}
                  onChange={(v) =>
                    setForm({ state: v, district: "", constituency: "" })
                  }
                  style={{ width: "100%" }}
                >
                  {states.map((s) => (
                    <Option key={s}>{s}</Option>
                  ))}
                </Select>
              </Col>

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
                    setForm({ ...form, district: v, constituency: "" })
                  }
                  style={{ width: "100%" }}
                >
                  {districts.map((d) => (
                    <Option key={d}>{d}</Option>
                  ))}
                </Select>
              </Col>

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
                    setForm({ ...form, constituency: v })
                  }
                  style={{ width: "100%" }}
                >
                  {constituencies.map((c) => (
                    <Option key={c}>{c}</Option>
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
                  {loading ? "Exporting..." : "Export CSV"}
                </Button>
              </Tooltip>

              <Button
                icon={<ClearOutlined />}
                size="large"
                onClick={handleClear}
                disabled={loading}
              >
                Clear Filters
              </Button>

            </Space>

            {total > 0 && (
              <div>
                <Progress
                  percent={progress}
                  status={progressStatus}
                  strokeColor={
                    progressStatus === "active"
                      ? { from: "#108ee9", to: "#87d068" }
                      : undefined
                  }
                />
                <Text type="secondary">
                  {progressStatus === "success"
                    ? `✓ Exported all ${total.toLocaleString()} records`
                    : `Exporting ${exported.toLocaleString()} / ${total.toLocaleString()} records...`}
                </Text>
              </div>
            )}

          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ExportElectoral;