import { request } from "@/lib/axios.utils";

export const apiCall = async (options: any) => {
	try {
		const response = await request({
			...options
		});

		if (response.data.status === false) {
			return { success: false, error: response.data.errors ?? response.data.message };
		}
		return { success: true, data: response.data };
	} catch (error: any) {
		return { success: false, message: error?.response?.data?.message ?? error?.message ?? "Failed to make request" };
	}
};