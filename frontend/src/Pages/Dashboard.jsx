import { useMemo, useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import jobs from "../mock/jobs.json"
import HeaderFilters from "../Components/HeaderFilters"
import JobTable from "../Components/JobTable"
import JobDetails from "../Components/JobDetails"

import "./Dashboard.css"
import { AppContext } from "../config/AppContext"
//import { getReq } from "../config/request"

const DATE_FILTER_OPTIONS = {
	all: { label: "All Dates" },
	today: { label: "Today", offsetStart: 0, offsetEnd: 0 },
	yesterday: { label: "Yesterday", offsetStart: -1, offsetEnd: -1 },
	last2Days: { label: "Last 2 Days", offsetStart: -1, offsetEnd: 0 },
}

const addDays = (date, days) => {
	const nextDate = new Date(date)
	nextDate.setDate(nextDate.getDate() + days)
	return nextDate
}

const parseDateInputValue = (value) => {
	if (!value) {
		return null
	}

	const [year, month, day] = value.split("-").map(Number)
	const parsedDate = new Date(year, month - 1, day)

	if (
		Number.isNaN(parsedDate.getTime()) ||
		parsedDate.getFullYear() !== year ||
		parsedDate.getMonth() !== month - 1 ||
		parsedDate.getDate() !== day
	) {
		return null
	}

	parsedDate.setHours(0, 0, 0, 0)
	return parsedDate
}

const getPresetDateRange = (dateFilter) => {
	const option = DATE_FILTER_OPTIONS[dateFilter]

	if (
		!option ||
		option.offsetStart === undefined ||
		option.offsetEnd === undefined
	) {
		return { startDate: null, endDate: null }
	}

	const today = new Date()
	today.setHours(0, 0, 0, 0)

	return {
		startDate: addDays(today, option.offsetStart),
		endDate: addDays(today, option.offsetEnd),
	}
}

const Dashboard = () => {
	const navigate = useNavigate()
	const { user, setUser, psline, setPsline } = useContext(AppContext)
	const [searchText, setSearchText] = useState("")
	const [customer, setCustomer] = useState("")
	const [dateFilter, setDateFilter] = useState("all")
	//const [jobs, setJobs] = useState([])

	useEffect(() => {
		if (!user) {
			navigate("/")
		} else {
			// const fetchJobs = async () => {
			// 	const res = await getReq("api/psl", user.token)
			// 	setJobs(res.value || [])
			// }
			// fetchJobs()
		}
	}, [])

	const normalizedSearchText = searchText.trim().toLowerCase()
	const activeDateRange = useMemo(
		() => getPresetDateRange(dateFilter),
		[dateFilter],
	)

	const customerOptions = useMemo(
		() =>
			[...new Set(jobs.map((job) => job.CustomerName).filter(Boolean))].sort(),
		[],
	)

	const filteredJobs = jobs.filter((job) => {
		const matchesSearch =
			!normalizedSearchText ||
			Object.values(job).some((value) =>
				String(value ?? "")
					.toLowerCase()
					.includes(normalizedSearchText),
			)

		const matchesCustomer = !customer || job.CustomerName === customer

		const scheduleDate = parseDateInputValue(job.ScheduleDate)
		const matchesDateStart =
			!activeDateRange.startDate ||
			(scheduleDate && scheduleDate >= activeDateRange.startDate)
		const matchesDateEnd =
			!activeDateRange.endDate ||
			(scheduleDate && scheduleDate <= activeDateRange.endDate)

		return (
			matchesSearch && matchesCustomer && matchesDateStart && matchesDateEnd
		)
	})

	const selectedJob =
		filteredJobs.find((job) => job.lineNo === psline) || filteredJobs[0] || null

	const metrics = [
		{
			label: "Visible Orders",
			value: String(filteredJobs.length).padStart(2, "0"),
		},
		{
			label: "Customers",
			value: new Set(filteredJobs.map((job) => job.CustomerName)).size,
		},
	]

	const handleResetFilters = () => {
		setSearchText("")
		setCustomer("")
		setDateFilter("all")
	}

	const handleLogout = () => {
		sessionStorage.removeItem("token")
		setUser(null)
		navigate("/")
	}

	const handleOpenOutputJournal = () => {
		if (!selectedJob) {
			return
		}

		navigate(
			`/output-journal/${selectedJob.documentNo}/${selectedJob.lineNo}`,
			{
				state: { job: selectedJob },
			},
		)
	}

	const sidebarItems = [
		{ label: "Overview", href: "#dashboard-overview" },
		{ label: "Job Table", href: "#dashboard-jobs" },
		{
			label: "Job Details",
			href: "#dashboard-details",
			disabled: !selectedJob,
		},
	]

	return (
		<div className='dashboard-page'>
			<aside className='dashboard-sidebar'>
				<div className='dashboard-sidebar-brand'>
					<h2>Shop Floor</h2>
				</div>

				<nav className='dashboard-sidebar-nav' aria-label='Dashboard sections'>
					{sidebarItems.map((item) => (
						<a
							key={item.label}
							href={item.disabled ? undefined : item.href}
							className={`dashboard-sidebar-link${item.disabled ? " is-disabled" : ""}`}
							aria-disabled={item.disabled ? "true" : undefined}>
							<span className='dashboard-sidebar-link-label'>{item.label}</span>
						</a>
					))}
				</nav>

				<button
					type='button'
					className='dashboard-sidebar-link dashboard-sidebar-action'
					onClick={handleOpenOutputJournal}
					disabled={!selectedJob}>
					<span className='dashboard-sidebar-link-label'>Output Journal</span>
				</button>

				<button
					type='button'
					className='dashboard-logout-button'
					onClick={handleLogout}>
					Logout
				</button>
			</aside>

			<div className='dashboard-main'>
				<section className='dashboard-hero' id='dashboard-overview'>
					<div className='dashboard-heading'>
						<p className='dashboard-eyebrow'>Production Overview</p>
						<h1>Shop Floor Dashboard</h1>
					</div>

					<div className='dashboard-metrics'>
						{metrics.map((metric) => (
							<div key={metric.label} className='dashboard-metric-card'>
								<span className='dashboard-metric-label'>{metric.label}</span>
								<strong className='dashboard-metric-value'>
									{metric.value}
								</strong>
							</div>
						))}
					</div>
				</section>

				<div id='dashboard-filters'>
					<HeaderFilters
						searchText={searchText}
						onSearchChange={setSearchText}
						selectedCustomer={customer}
						onCustomerChange={setCustomer}
						customerOptions={customerOptions}
						dateFilter={dateFilter}
						onDateFilterChange={setDateFilter}
						onRefresh={handleResetFilters}
					/>
				</div>

				<div id='dashboard-jobs'>
					<JobTable
						jobs={filteredJobs}
						selectedJobId={selectedJob?.lineNo ?? null}
						onSelectJob={setPsline}
					/>
				</div>

				{selectedJob && (
					<div id='dashboard-details'>
						<JobDetails job={selectedJob} />
					</div>
				)}
			</div>
			<p className='login-footer'>
				Don't have an account? <Link to='/signup'>Signup</Link>
			</p>
		</div>
	)
}

export default Dashboard
