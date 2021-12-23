import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import useGetScores from '../../lib/useGetScores'
import { USER_SCORES_URL } from '../../lib/useGetScores'

const GolferScores = () => {
  const router = useRouter()
  const { id } = router.query
  const { name, scores, error } = useGetScores(id)

  return (
    <Layout>
      { error ? (
        error.info.errors
      ) : (
        name && (
          <>
            <h1> The scores of user {name}: </h1>
            {scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={name}
              />
            ))}
          </>
        )
      )}
    </Layout>
  )
}

export default GolferScores
