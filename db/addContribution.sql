insert into contributions
    (
    user_id,
    story_id,
    contribution,
    is_accepted,
    prior_contribution_id
    )

values    ( ${user_id}, ${story_id}, ${contribution}, ${is_accepted} , ${prior_contribution_id} );