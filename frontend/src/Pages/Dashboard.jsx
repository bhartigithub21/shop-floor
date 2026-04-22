import { useEffect, useState } from "react"
import jobs from "../mock/jobs.json"
import HeaderFilters from "../components/HeaderFilters"
import JobTable from "../components/JobTable"
import JobDetails from "../components/JobDetails"
import OperatorActions from "../components/OperatorActions"

function Dashboard() {
	const [selectedJob, setSelectedJob] = useState(null)
	const [searchText, setSearchText] = useState("")
	const [Customers, setCustomers] = useState(" ")

	const normalizedSearchText = searchText.trim().toLowerCase()
	const filteredJobs = jobs.filter((job) => {
		if (!normalizedSearchText) {
			return true
		}

		return Object.values(job).some((value) =>
			String(value ?? "")
				.toLowerCase()
				.includes(normalizedSearchText),
		)
	})

	useEffect(() => {
		if (
			selectedJob &&
			!filteredJobs.some((job) => job.prodOrderNo === selectedJob.prodOrderNo)
		) {
			setSelectedJob(null)
		}
	}, [filteredJobs, selectedJob])

	return (
		<div style={{ padding: "20px" }}>
			<h1>Shop Floor Dashboard</h1>

			<HeaderFilters
				searchText={searchText}
				onSearchChange={setSearchText}
				Customers={Customers}
				setCustomers={setCustomers}
				onRefresh={() => setSearchText("")}
			/>

			<JobTable jobs={filteredJobs} onSelectJob={setSelectedJob} />

			{selectedJob && (
				<>
					<JobDetails job={selectedJob} />
					<OperatorActions job={selectedJob} />
				</>
			)}
		</div>
	)
}

export default Dashboard
