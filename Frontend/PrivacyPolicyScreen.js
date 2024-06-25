import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: 'chocolate' }]}>Privacy Policy</Text>
      <ScrollView contentContainerStyle={styles.privacyPolicyContent}>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>1. Information We Collect</Text>
          <Text style={styles.privacyPolicyText}>
            User Profile Data: When you create an account or user profile within the App, we may collect your name, email address, contact information, and other relevant personal details.
          </Text>
          <Text style={styles.privacyPolicyText}>
            Vehicle Information: To utilize the vehicle and fuel management features, you can voluntarily provide information about your vehicles, including make, model, year, VIN (Vehicle Identification Number), and fuel efficiency data.
          </Text>
          <Text style={styles.privacyPolicyText}>
            Fuel and Maintenance Records: You have the option to input data related to fuel consumption, maintenance activities, and service history.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>2. How We Use Your Information</Text>
          <Text style={styles.privacyPolicyText}>
            We use the information we collect for various purposes, including:
          </Text>
          <Text style={styles.privacyPolicyText}>
            Providing Services: To offer the services you request, including vehicle and fuel management tools, reminders, and other App features.
          </Text>
          <Text style={styles.privacyPolicyText}>
            Improving the App: We analyze usage trends and monitor app performance to make continuous improvements for a better user experience.
          </Text>
          <Text style={styles.privacyPolicyText}>
            Communications: With your explicit consent, we may send you updates, newsletters, and notifications related to the App or our services.
          </Text>
          <Text style={styles.privacyPolicyText}>
            Legal Compliance: To fulfill legal obligations, respond to legal requests, and protect our rights and interests.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>3. Data Security</Text>
          <Text style={styles.privacyPolicyText}>
            Your data security is important to us. We employ reasonable measures to protect the information we collect and store. However, please note that no method of data transmission or storage is entirely secure, and we cannot guarantee absolute data security.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>4. Third-Party Services</Text>
          <Text style={styles.privacyPolicyText}>
            The App may contain links to third-party services or websites. Please be aware that we are not responsible for their privacy practices. We recommend reviewing their privacy policies when interacting with these third parties.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>5. Your Choices</Text>
          <Text style={styles.privacyPolicyText}>
            You have control over the information you provide. You can:
          </Text>
          <Text style={styles.privacyPolicyText}>
            Review and Update Information: Access, update, or delete your user profile and associated data within the App.
          </Text>
          <Text style={styles.privacyPolicyText}>
            Opt-Out: You can choose to opt out of receiving promotional communications from us.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgoldenrodyellow',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  privacyPolicyContent: {
    padding: 20,
  },
  privacyPolicyText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'chocolate',
    fontFamily: 'serif',
  },
  sectionHeading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#c7b82e',
    fontFamily: 'serif',
  },
  section: {
    marginBottom: 20,
  },
});

export default PrivacyPolicyScreen;
