# HexaShield Security Framework Dashboard

HexaShield is a comprehensive security framework designed specifically for SMEs (Small and Medium Enterprises) that provides plug-and-play security capabilities without requiring deep security expertise. This dashboard is a demonstration of the management interface for the HexaShield framework.

## Project Overview

The HexaShield framework implements a comprehensive security solution that includes:

1. **Central Management Component**: Coordinates security workflows across all components
2. **Security Monitoring Component**: Delivers visibility through network and host-based monitoring
3. **Protection Component**: Implements active defense mechanisms against various attacks
4. **Response Component**: Enables swift reaction to security incidents

This dashboard application serves as the central management interface for configuring, monitoring, and controlling the security framework.

## Key Features

- **Dashboard**: Overview of security status, threats, and system health
- **Monitoring**: Real-time monitoring of security events and system components
- **Protection Configuration**: Configure protection mechanisms against various attacks
- **Response Management**: Configure and monitor automated and manual response actions
- **Rule Customization**: Create and customize security rules for different attack types
- **Integration Configuration**: Configure how HexaShield integrates with existing infrastructure
- **Attack Simulation**: Simulate various attack scenarios to test security effectiveness

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, Recharts
- **Backend**: Node.js (simulated in this demo), Express.js 
- **Security Components**:
  - Web Application Firewall (ModSecurity)
  - Database Firewall (GreenSQL)
  - Network Intrusion Detection (Suricata)
  - Authentication System (Keycloak)
  - And others as detailed in the project documentation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hexashield-dashboard.git
   cd hexashield-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   # or
   yarn start
   ```

4. The application will be available at http://localhost:3000

### Demo Credentials

- **Email**: admin@hexashield.com
- **Password**: admin123

## Project Structure

```
src/
├── assets/           # Static assets and global styles
├── components/       # Reusable UI components
│   ├── auth/         # Authentication related components
│   ├── dashboard/    # Dashboard components
│   ├── layout/       # Layout components
│   ├── monitoring/   # Monitoring components
│   ├── protection/   # Protection components
│   ├── response/     # Response components
│   ├── rules/        # Rule customization components
│   ├── integration/  # Integration components
│   └── simulation/   # Attack simulation components
├── contexts/         # React context providers
├── data/             # Mock data
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API services
├── utils/            # Utility functions
├── App.js            # Main application component
└── index.js          # Application entry point
```

## Simulation Features

The dashboard includes simulation capabilities to demonstrate how the HexaShield framework responds to different types of attacks:

1. **SQL Injection Simulation**: Demonstrates protection against SQL injection attacks
2. **Cross-Site Scripting (XSS) Simulation**: Shows defenses against XSS attacks
3. **LDAP Injection Simulation**: Illustrates protection for authentication systems

These simulations help demonstrate the effectiveness of the security framework without requiring a full security infrastructure deployment.

## Rule Customization

One of the key features of HexaShield is the ability to customize security rules based on specific SME requirements:

- Create custom rules for specific attack types
- Adjust detection thresholds to balance security and usability
- Configure actions to take when threats are detected
- Test rules using the attack simulation feature

## Integration with SME Infrastructure

HexaShield is designed to integrate smoothly with existing SME infrastructure:

- Network integration with existing firewalls and routers
- Web application integration with various web servers and applications
- Database integration with popular database systems
- Authentication integration with directory services and identity providers

The integration configuration pages demonstrate how this integration would be configured in a real-world deployment.

## Production Deployment

For a production deployment, additional steps would be needed:

1. Configure a backend service to replace the simulated API
2. Set up MongoDB or another database for persistent storage
3. Configure security components based on your infrastructure
4. Implement proper authentication and authorization

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- This project was created as part of the 7808ICT T1 Project and Cyber Security Management course
- Built by Team HexaShield: Nathan Nguyen Long Phan, Vaishnavi Rawat, and Anand Valaicha