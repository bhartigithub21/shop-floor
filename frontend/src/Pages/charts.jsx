import React, { useEffect, useState } from "react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
	BarChart,
	Bar,
} from "recharts"

import "./Charts.css"
import { getReq } from "../config/request"

export default function Charts() {
	const [lineData, setLineData] = useState([])
	const [scrapData, setScrapData] = useState([])
	const [outputData, setOutputData] = useState([])

	const fetchChartData = async () => {
		try {
			const response = await getReq("api/dummy/chart", "")

			const groupedByDate = response.reduce((acc, item) => {
				const key = item.endDate

				if (!acc[key]) {
					acc[key] = {
						endDate: key,
						output: 0,
					}
				}

				acc[key].output += Number(item.Output || 0)

				return acc
			}, {})

			const last7Days = []

			for (let i = 6; i >= 0; i--) {
				const date = new Date()

				date.setDate(date.getDate() - i)

				const formattedDate = date.toISOString().split("T")[0]

				last7Days.push(formattedDate)
			}

			const finalLineData = last7Days.map((date) => ({
				endDate: date,
				output: groupedByDate[date]?.output || 0,
			}))

			setLineData(finalLineData)

			const groupedScrap = response.reduce((acc, item) => {
				const key = item.scrapCode || "No Scrap"

				if (!acc[key]) {
					acc[key] = {
						scrapCode: key,
						scrapQnt: 0,
					}
				}

				acc[key].scrapQnt += Number(item.scrapQnt || 0)

				return acc
			}, {})

			setScrapData(Object.values(groupedScrap))

			const groupedOutput = response.reduce((acc, item) => {
				const key = item.No || "Unknown"

				if (!acc[key]) {
					acc[key] = {
						No: key,
						output: 0,
					}
				}

				acc[key].output += Number(item.Output || 0)

				return acc
			}, {})

			setOutputData(Object.values(groupedOutput))
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		fetchChartData()

		const interval = setInterval(() => {
			fetchChartData()
		}, 3000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className='chart-page'>
			<div className='chart-top-bar'>
				<div className='chart-main-title'>Production Dashboard</div>
			</div>

			<div className='dashboard-grid'>
				<div className='left-section'>
					<div className='chart-header'>
						Output Quantity Chart (Last 7 Days)
					</div>

					<div className='chart-box line-chart-box'>
						<ResponsiveContainer width='100%' height='100%'>
							<LineChart data={lineData}>
								<CartesianGrid strokeDasharray='3 3' />

								<XAxis dataKey='endDate' tick={{ fontSize: 11 }} />

								<YAxis tick={{ fontSize: 11 }} />

								<Tooltip contentStyle={{ fontSize: "12px" }} />

								<Legend wrapperStyle={{ fontSize: "12px" }} />

								<Line
									type='monotone'
									dataKey='output'
									name='Total Output'
									stroke='#8884d8'
									strokeWidth={3}
									dot={{ r: 4 }}
									activeDot={{ r: 6 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className='right-section'>
					{/* <div className="chart-header">
            Scrap Quantity By Scrap Code
          </div> */}

					<div className='chart-box small-chart-box'>
						<ResponsiveContainer width='100%' height='100%'>
							<BarChart data={scrapData}>
								<CartesianGrid strokeDasharray='3 3' />

								<XAxis dataKey='scrapCode' tick={{ fontSize: 10 }} />

								<YAxis tick={{ fontSize: 10 }} />

								<Tooltip contentStyle={{ fontSize: "12px" }} />

								<Legend wrapperStyle={{ fontSize: "12px" }} />

								<Bar dataKey='scrapQnt' name='Scrap Quantity' fill='#ff7300' />
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* <div className="chart-header">
            Output Quantity By Job No
          </div> */}

					<div className='chart-box small-chart-box'>
						<ResponsiveContainer width='100%' height='100%'>
							<BarChart data={outputData}>
								<CartesianGrid strokeDasharray='3 3' />

								<XAxis dataKey='No' tick={{ fontSize: 10 }} />

								<YAxis tick={{ fontSize: 10 }} />

								<Tooltip contentStyle={{ fontSize: "12px" }} />

								<Legend wrapperStyle={{ fontSize: "12px" }} />

								<Bar dataKey='output' name='Output Quantity' fill='#82ca9d' />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	)
}
