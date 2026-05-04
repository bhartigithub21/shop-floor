import { Link, useLocation, useParams } from "react-router-dom"
import OutputJournal from "../Components/OutputJournal"
import jobs from "../mock/jobs.json"
import "./OutputJournalPage.css"

function OutputJournalPage() {
	const { documentNo, lineNo } = useParams()
	const location = useLocation()

	const jobFromState = location.state?.job

	const job =
		String(jobFromState?.documentNo) === documentNo &&
		String(jobFromState?.lineNo) === lineNo
			? jobFromState
			: jobs.find(
					(item) =>
						String(item.documentNo) === documentNo &&
						String(item.lineNo) === lineNo,
				) || null

	if (!job) {
		return (
			<div className='output-journal-page'>
				<section className='output-journal-shell output-journal-empty'>
					<p className='output-journal-eyebrow'>Output Journal</p>
					<h1>Job Not Found</h1>
					<p className='output-journal-empty-copy'>
						We could not load a production order for this journal page.
					</p>
					<Link to='/dashboard' className='output-journal-back-button'>
						Return to Dashboard
					</Link>
				</section>
			</div>
		)
	}

	return (
		<div className='output-journal-page'>
			<section className='output-journal-shell'>
				<div className='output-journal-page-topbar'>
					<div>
						<p className='output-journal-eyebrow'>Production Reporting</p>
						<h1>Output Journal</h1>
					</div>

					<Link to='/dashboard' className='output-journal-back-button'>
						Back to Dashboard
					</Link>
				</div>

				<OutputJournal job={job} />
			</section>
		</div>
	)
}

export default OutputJournalPage
