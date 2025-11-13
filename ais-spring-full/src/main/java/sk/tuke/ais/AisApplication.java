package sk.tuke.ais;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import sk.tuke.ais.config.JwtProperties;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
public class AisApplication {
  public static void main(String[] args) {
    SpringApplication.run(AisApplication.class, args);
  }
}
