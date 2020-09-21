package com.a305.balbadack.config;

import com.a305.balbadack.model.service.CustomUserDetailService;
import com.a305.balbadack.security.JwtAuthenticationEntryPoint;
import com.a305.balbadack.security.JwtAuthenticationFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.BeanIds;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
    securedEnabled = true,
    jsr250Enabled = true,
    prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Autowired
    CustomUserDetailService customUserdetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;


    // @Bean
    // public JwtAuthenticationFilter JwtAuthenticationFilter(){
    //     return new JwtAuthenticationFilter();
    // }

    // Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        // return PasswordEncoderFactories.createDelegatingPasswordEncoder();
        return new BCryptPasswordEncoder();
    }

    // authenticationManager를 Bean 등록합니다.
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(customUserdetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/res/**").antMatchers("/images/**").antMatchers("/swagger-ui.html"); // JSP 리소스 파일이나 자바스크립트, 이미지 파일 등이 저장된 경로는 무시
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                    .exceptionHandling()
                        .authenticationEntryPoint(unauthorizedHandler)
                        .and()
                .headers().frameOptions().disable()
                .and() // JWT는 Session 기반이 아닌 토큰인증 방식이므로 Session 사용 안함 설정
                    .sessionManagement()
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()
                    // .antMatchers("/api/v1/**").hasRole(Role.USER.name())
                    // .antMatchers("/review/**", "/user/mypage", "/animal/**").hasAnyRole("USER", "STAFF", "ADMIN")
                    .antMatchers("/review/**", "/user/mypage", "/animal/**", "/hospital/code").hasAuthority("ROLE_USER")//.hasRole("USER")
                    .antMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
                    .antMatchers("/hospital/name").hasAuthority("ROLE_USER")//hasAnyRole("STAFF", "ADMIN")
                    .antMatchers("/**", "/user/login", "/user/signup").permitAll()
                    .anyRequest().authenticated() // 기타 경로는 인증을 필요로 함
                .and()
                    .formLogin()
                    .loginPage("/user/login")
                    .loginProcessingUrl("/user/loginProcess") // ID, PW 입력 후 로그인 버튼
                    .defaultSuccessUrl("/") // 로그인 성공 시 화면
                    // .faileureUrl("/user/loginError")
                .and()
                    .logout()
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true) // 리다이렉트 후 세션 초기화
                .and()
                    .addFilterBefore(new JwtAuthenticationFilter(), //JwtAuthenticationFilter(jwtProvider)
                        UsernamePasswordAuthenticationFilter.class);
                    // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 넣음.
                // .and()
                // .authenticationProvider(authProvider); // 로그인에서 authenticated 호출하면 연결
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // - (3)
        configuration.addAllowedOrigin("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}