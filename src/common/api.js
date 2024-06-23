import tools from "@/common/tools";

const API_PRE = "http://127.0.0.1:9000";

export const getBanner = (data) =>
  tools.request({
    url: `${API_PRE}/home/getbanner`,
    params: data,
  });

export const getCity = (data) =>
  tools.request({
    url: `${API_PRE}/home/citys`,
    params: data,
  });

export const getAllFlight = (data) =>
  tools.request({
    url: `${API_PRE}/allFlight/list`,
    params: data,
  });
