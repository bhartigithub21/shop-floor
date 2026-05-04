import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import jobs from "../mock/jobs.json"
import HeaderFilters from "../Components/HeaderFilters"
import JobTable from "../Components/JobTable"
import JobDetails from "../Components/JobDetails"

import "./Dashboard.css"

const Dashboard = () => {
	const navigate = useNavigate()

	const [selectedJobId, setSelectedJobId] = useState(
		jobs[0]?.documentNo ?? null,
	)
	const [searchText, setSearchText] = useState("")
	const [customer, setCustomer] = useState("")

	const normalizedSearchText = searchText.trim().toLowerCase()

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

		return matchesSearch && matchesCustomer
	})

	const selectedJob =
		filteredJobs.find((job) => job.documentNo === selectedJobId) ||
		filteredJobs[0] ||
		null

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
	}

	const handleLogout = () => {
		localStorage.removeItem("token")
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
		{ label: "Job Queue", href: "#dashboard-jobs" },
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
						onRefresh={handleResetFilters}
					/>
				</div>

				<div id='dashboard-jobs'>
					<JobTable
						jobs={filteredJobs}
						selectedJobId={selectedJob?.documentNo ?? null}
						onSelectJob={setSelectedJobId}
					/>
				</div>

				{selectedJob && (
					<div id='dashboard-details'>
						<JobDetails job={selectedJob} />
					</div>
				)}
			</div>
		</div>
	)
}

export default Dashboard
