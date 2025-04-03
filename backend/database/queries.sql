SELECT u.id, u.name MAX(t.clock_in) AS last_clock_in
FROM users u
LEFT JOIN time_entries t ON u.id = t.user_id
GROUP BY u.id;

SELECT user_id, SUM(total_hours) AS weekly_hours
FROM time_entries
WHERE clock_in >= NOW() - INTERVAL '7 days'
GROUP BY user_id;