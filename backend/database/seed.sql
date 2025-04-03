INSERT INTO users (name, is_admin) VALUES
('Captain Grant', TRUE),
('Elliot Stocker', TRUE),
('Test User', FALSE);

INSERT INTO time_entries (user_id, clock_in, clock_out) VALUES
(1, '2025-04-02 08:00:00', '2025-04-02 16:30:00'),
(2, '2025-04-02 09:00:00', '2025-04-02 17:00:00'),
(3, '2025-04-02 10:00:00', '2025-04-02 14:00:00');