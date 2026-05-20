package ies.alcores.daweb;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseInitializer.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        boolean dataExists = false;
        try {
            Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Alumno", Integer.class);
            if (count != null && count > 0) {
                dataExists = true;
            }
        } catch (Exception e) {
            log.info("Table Alumno does not exist or is empty. Initializing database...");
        }

        if (!dataExists) {
            log.info("Initializing database with script.sql...");
            try (var is = getClass().getResourceAsStream("/static/script.sql")) {
                if (is == null) {
                    log.error("script.sql not found in classpath!");
                    return;
                }
                String sql = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))
                        .lines()
                        .collect(Collectors.joining("\n"));
                
                String[] statements = sql.split(";");
                for (String statement : statements) {
                    String trimmed = statement.trim();
                    if (!trimmed.isEmpty()) {
                        try {
                            jdbcTemplate.execute(trimmed);
                        } catch (Exception ex) {
                            log.warn("Failed to execute statement: " + trimmed + ". Error: " + ex.getMessage());
                        }
                    }
                }
                log.info("Database initialization completed successfully.");
            } catch (Exception e) {
                log.error("Failed to initialize database", e);
            }
        } else {
            log.info("Database already initialized.");
        }
    }
}
