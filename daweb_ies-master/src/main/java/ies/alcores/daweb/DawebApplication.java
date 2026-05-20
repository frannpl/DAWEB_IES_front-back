package ies.alcores.daweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.net.URI;

@SpringBootApplication
public class DawebApplication {

	public static void main(String[] args) {
		String url = System.getenv("SPRING_DATASOURCE_URL");
		if (url != null && (url.startsWith("postgres://") || url.startsWith("postgresql://"))) {
			try {
				// Convert to standard URI to parse components
				String rawUri = url.startsWith("postgresql://") ? url.replaceFirst("postgresql://", "postgres://") : url;
				URI uri = new URI(rawUri);
				
				String userInfo = uri.getUserInfo();
				String host = uri.getHost();
				int port = uri.getPort();
				String path = uri.getPath(); // starts with /
				
				if (host != null && path != null) {
					String jdbcUrl = "jdbc:postgresql://" + host + (port != -1 ? ":" + port : ":5432") + path;
					
					// Set both env-like system properties and direct spring properties
					System.setProperty("SPRING_DATASOURCE_URL", jdbcUrl);
					System.setProperty("spring.datasource.url", jdbcUrl);
					
					if (userInfo != null && userInfo.contains(":")) {
						String[] parts = userInfo.split(":", 2);
						
						System.setProperty("SPRING_DATASOURCE_USERNAME", parts[0]);
						System.setProperty("spring.datasource.username", parts[0]);
						
						System.setProperty("SPRING_DATASOURCE_PASSWORD", parts[1]);
						System.setProperty("spring.datasource.password", parts[1]);
					}
				}
			} catch (Exception e) {
				// Fallback to simple replace if parsing fails
				String jdbcUrl = url.replaceFirst("postgresql://", "jdbc:postgresql://").replaceFirst("postgres://", "jdbc:postgresql://");
				System.setProperty("SPRING_DATASOURCE_URL", jdbcUrl);
				System.setProperty("spring.datasource.url", jdbcUrl);
			}
		}
		SpringApplication.run(DawebApplication.class, args);
	}

}


