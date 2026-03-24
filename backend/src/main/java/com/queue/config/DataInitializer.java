package com.queue.config;

import com.queue.entity.*;
import com.queue.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final OfficeRepository officeRepository;
    private final DepartmentRepository departmentRepository;
    private final GovServiceRepository govServiceRepository;
    private final CounterRepository counterRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        User admin = userRepository.findByEmail("admin@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("System Admin")
                .email("admin@govqueue.com")
                .phoneNumber("9000000001")
                .password(passwordEncoder.encode("Admin@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_ADMIN)
                .enabled(true)
                .build()));

        User staff = userRepository.findByEmail("staff@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Counter Staff")
                .email("staff@govqueue.com")
                .phoneNumber("9000000002")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        User staff2 = userRepository.findByEmail("staff.transport@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Transport Staff")
                .email("staff.transport@govqueue.com")
                .phoneNumber("9000000004")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        User staff3 = userRepository.findByEmail("staff.mee@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("MeeSeva Staff")
                .email("staff.mee@govqueue.com")
                .phoneNumber("9000000005")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        User staff4 = userRepository.findByEmail("staff.health@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Health Services Staff")
                .email("staff.health@govqueue.com")
                .phoneNumber("9000000006")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        User staff5 = userRepository.findByEmail("staff.municipal@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Municipal Staff")
                .email("staff.municipal@govqueue.com")
                .phoneNumber("9000000007")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        User staff6 = userRepository.findByEmail("staff.social@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Social Welfare Staff")
                .email("staff.social@govqueue.com")
                .phoneNumber("9000000008")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        User staff7 = userRepository.findByEmail("staff.labour@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Labour Services Staff")
                .email("staff.labour@govqueue.com")
                .phoneNumber("9000000009")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        User staff8 = userRepository.findByEmail("staff.education@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Education Services Staff")
                .email("staff.education@govqueue.com")
                .phoneNumber("9000000010")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        User staff9 = userRepository.findByEmail("staff.police@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Police Verification Staff")
                .email("staff.police@govqueue.com")
                .phoneNumber("9000000011")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        User staff10 = userRepository.findByEmail("staff.agri@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Agriculture Services Staff")
                .email("staff.agri@govqueue.com")
                .phoneNumber("9000000012")
                .password(passwordEncoder.encode("Staff@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_STAFF)
                .enabled(true)
                .build()));

        userRepository.findByEmail("citizen@govqueue.com").orElseGet(() -> userRepository.save(User.builder()
                .fullName("Citizen User")
                .email("citizen@govqueue.com")
                .phoneNumber("9000000003")
                .password(passwordEncoder.encode("Citizen@123"))
                .preferredLanguage("en")
                .role(Role.ROLE_CITIZEN)
                .enabled(true)
                .build()));

        Office office = officeRepository.findByName("Hyderabad Citizen Service Center").orElseGet(() -> officeRepository.save(Office.builder()
                .name("Hyderabad Citizen Service Center")
                .address("Road No. 1, Banjara Hills")
                .city("Hyderabad")
                .state("Telangana")
                .contactNumber("04012345678")
                .active(true)
                .build()));

        Office office2 = officeRepository.findByName("Secunderabad Public Service Hub").orElseGet(() -> officeRepository.save(Office.builder()
                .name("Secunderabad Public Service Hub")
                .address("Sardar Patel Road")
                .city("Secunderabad")
                .state("Telangana")
                .contactNumber("04087654321")
                .active(true)
                .build()));

        Office office3 = officeRepository.findByName("Warangal Integrated Citizen Center").orElseGet(() -> officeRepository.save(Office.builder()
                .name("Warangal Integrated Citizen Center")
                .address("Hanamkonda Main Road")
                .city("Warangal")
                .state("Telangana")
                .contactNumber("08702555123")
                .active(true)
                .build()));

        Office office4 = officeRepository.findByName("Khammam District Service Plaza").orElseGet(() -> officeRepository.save(Office.builder()
                .name("Khammam District Service Plaza")
                .address("Collectorate Road")
                .city("Khammam")
                .state("Telangana")
                .contactNumber("08742234111")
                .active(true)
                .build()));

        Office office5 = officeRepository.findByName("Nizamabad Urban Citizen Desk").orElseGet(() -> officeRepository.save(Office.builder()
                .name("Nizamabad Urban Citizen Desk")
                .address("Phulong Cross Road")
                .city("Nizamabad")
                .state("Telangana")
                .contactNumber("08462222090")
                .active(true)
                .build()));

        Department revenue = departmentRepository.findByOfficeIdAndName(office.getId(), "Revenue Department").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office)
                .name("Revenue Department")
                .description("Certificates and land records")
                .build()));

        Department transport = departmentRepository.findByOfficeIdAndName(office.getId(), "Transport Department").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office)
                .name("Transport Department")
                .description("Driving license and vehicle services")
                .build()));

        Department civil = departmentRepository.findByOfficeIdAndName(office.getId(), "Civil Supplies").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office)
                .name("Civil Supplies")
                .description("Ration cards and food security services")
                .build()));

        Department meeseva = departmentRepository.findByOfficeIdAndName(office2.getId(), "MeeSeva Services").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office2)
                .name("MeeSeva Services")
                .description("Citizen service requests and utility-linked applications")
                .build()));

        Department municipal = departmentRepository.findByOfficeIdAndName(office2.getId(), "Municipal Administration").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office2)
                .name("Municipal Administration")
                .description("Property tax, trade license, and sanitation citizen services")
                .build()));

        Department health = departmentRepository.findByOfficeIdAndName(office3.getId(), "Public Health").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office3)
                .name("Public Health")
                .description("Health card, clinic registration, and medical welfare services")
                .build()));

        Department police = departmentRepository.findByOfficeIdAndName(office3.getId(), "Police Verification").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office3)
                .name("Police Verification")
                .description("Character certificates, tenant verification, and police clearance support")
                .build()));

        Department socialWelfare = departmentRepository.findByOfficeIdAndName(office4.getId(), "Social Welfare").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office4)
                .name("Social Welfare")
                .description("Scholarships, pensions, and social security services")
                .build()));

        Department labour = departmentRepository.findByOfficeIdAndName(office4.getId(), "Labour Department").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office4)
                .name("Labour Department")
                .description("Worker registration and labour welfare support")
                .build()));

        Department agriculture = departmentRepository.findByOfficeIdAndName(office5.getId(), "Agriculture Support").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office5)
                .name("Agriculture Support")
                .description("Farmer passbooks, subsidy claims, and crop assistance")
                .build()));

        Department education = departmentRepository.findByOfficeIdAndName(office5.getId(), "Education Services").orElseGet(() -> departmentRepository.save(Department.builder()
                .office(office5)
                .name("Education Services")
                .description("Student certificates, scholarship desk, and education support")
                .build()));

        seedService(revenue, "Income Certificate", "Issue and renewal of income certificates", 12, "50.00");
        seedService(revenue, "Residence Certificate", "Address and residence verification certificates", 10, "40.00");
        seedService(revenue, "Caste Certificate", "Community and caste certificate issuance", 14, "60.00");
        seedService(revenue, "Land Record Extract", "Land ownership and passbook extracts", 18, "120.00");

        seedService(transport, "Driving License Renewal", "DL renewal service", 15, "200.00");
        seedService(transport, "Learner License Application", "Fresh learner license registration", 20, "150.00");
        seedService(transport, "Vehicle Registration Copy", "Duplicate RC and registration support", 16, "180.00");
        seedService(transport, "Ownership Transfer Support", "Vehicle transfer workflow assistance", 22, "300.00");

        seedService(civil, "New Ration Card", "Fresh ration card enrollment", 18, "75.00");
        seedService(civil, "Ration Card Update", "Family member and address corrections", 12, "35.00");
        seedService(civil, "Gas Subsidy Linking", "Link LPG subsidy with citizen records", 10, "25.00");

        seedService(meeseva, "Birth Certificate Copy", "Certified birth certificate issuance", 8, "30.00");
        seedService(meeseva, "Death Certificate Copy", "Certified death certificate issuance", 8, "30.00");
        seedService(meeseva, "Pension Application Intake", "Senior pension and welfare submissions", 20, "0.00");
        seedService(meeseva, "Utility Name Correction", "Electricity and water record correction support", 14, "45.00");

        seedService(municipal, "Property Tax Payment Support", "Property tax assessment and payment helpdesk", 10, "20.00");
        seedService(municipal, "Trade License Renewal", "Business trade license renewal support", 16, "250.00");
        seedService(municipal, "Birth Registration Update", "Corrections to municipal birth registration", 12, "35.00");
        seedService(municipal, "Sanitation Complaint Registration", "Waste collection and sanitation ticket registration", 8, "0.00");

        seedService(health, "Health Card Enrollment", "Public health identification and enrollment support", 15, "0.00");
        seedService(health, "Medical Reimbursement Intake", "Medical reimbursement claim intake and validation", 20, "0.00");
        seedService(health, "Vaccination Certificate Copy", "Reissue of vaccination certificates", 8, "25.00");
        seedService(health, "Hospital Referral Assistance", "Referral document validation and processing", 12, "40.00");

        seedService(police, "Police Clearance Certificate", "Police clearance document support", 18, "150.00");
        seedService(police, "Tenant Verification Request", "Residential tenant verification service", 14, "80.00");
        seedService(police, "Employee Verification Request", "Background and identity verification support", 16, "100.00");
        seedService(police, "Lost Document Report Copy", "Copy of registered lost document acknowledgment", 10, "30.00");

        seedService(socialWelfare, "Scholarship Application Support", "Student welfare and scholarship intake", 18, "0.00");
        seedService(socialWelfare, "Senior Pension Renewal", "Renewal for old age and disability pensions", 15, "0.00");
        seedService(socialWelfare, "Widow Assistance Registration", "Support scheme registration for beneficiaries", 16, "0.00");
        seedService(socialWelfare, "Disability Benefit Intake", "Benefit and certificate linked welfare intake", 20, "0.00");

        seedService(labour, "Worker Registration Card", "Construction and labour worker card issuance", 14, "50.00");
        seedService(labour, "Labour Welfare Claim", "Claim intake for labour welfare benefits", 18, "0.00");
        seedService(labour, "Contractor License Query", "License support and document guidance", 12, "60.00");
        seedService(labour, "Employment Exchange Update", "Worker profile and skill record update", 10, "25.00");

        seedService(agriculture, "Farmer Subsidy Application", "Input subsidy and scheme application support", 18, "0.00");
        seedService(agriculture, "Crop Loss Claim Intake", "Disaster and crop-loss claim registration", 20, "0.00");
        seedService(agriculture, "Soil Health Card Copy", "Soil card copy and details assistance", 12, "20.00");
        seedService(agriculture, "Seed Distribution Token", "Seasonal seed distribution queue support", 9, "0.00");

        seedService(education, "Bonafide Certificate Request", "School and college bonafide certificate support", 8, "20.00");
        seedService(education, "Scholarship Status Helpdesk", "Scholarship status and documentation support", 10, "0.00");
        seedService(education, "Transfer Certificate Copy", "Duplicate transfer certificate request support", 12, "35.00");
        seedService(education, "Student Fee Reimbursement Intake", "Fee reimbursement application assistance", 16, "0.00");

        seedCounter(office, revenue, staff, "Counter A1");
        seedCounter(office, transport, staff2, "Counter T2");
        seedCounter(office2, meeseva, staff3, "Counter M1");
        seedCounter(office2, municipal, staff5, "Counter U2");
        seedCounter(office3, health, staff4, "Counter H1");
        seedCounter(office3, police, staff9, "Counter P2");
        seedCounter(office4, socialWelfare, staff6, "Counter S1");
        seedCounter(office4, labour, staff7, "Counter L2");
        seedCounter(office5, agriculture, staff10, "Counter G1");
        seedCounter(office5, education, staff8, "Counter E2");
    }

    private void seedService(Department department, String name, String description, int avgMinutes, String feeAmount) {
        govServiceRepository.findByDepartmentIdAndName(department.getId(), name).orElseGet(() -> govServiceRepository.save(GovService.builder()
                .department(department)
                .name(name)
                .description(description)
                .avgServiceTimeMinutes(avgMinutes)
                .prioritySupported(true)
                .feeAmount(new BigDecimal(feeAmount))
                .build()));
    }

    private void seedCounter(Office office, Department department, User staff, String counterName) {
        Counter existingByName = counterRepository.findByOfficeIdAndName(office.getId(), counterName).orElse(null);
        if (existingByName != null) {
            if (existingByName.getAssignedStaff() == null || !existingByName.getAssignedStaff().getId().equals(staff.getId())) {
                existingByName.setAssignedStaff(staff);
            }
            if (!existingByName.getDepartment().getId().equals(department.getId())) {
                existingByName.setDepartment(department);
            }
            existingByName.setStatus("ACTIVE");
            counterRepository.save(existingByName);
            return;
        }

        Counter existingByStaff = counterRepository.findByAssignedStaffId(staff.getId()).orElse(null);
        if (existingByStaff != null) {
            return;
        }

        counterRepository.save(Counter.builder()
                .office(office)
                .department(department)
                .assignedStaff(staff)
                .name(counterName)
                .status("ACTIVE")
                .build());
    }
}
