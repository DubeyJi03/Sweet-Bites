const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ===============================
// Submit contact form (Public)
// ===============================
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create new contact submission
    const contact = new Contact({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      subject,
      message: message.trim(),
      submittedAt: new Date(),
      status: 'pending'
    });

    await contact.save();

    // (Optional) send confirmation email
    // await sendContactConfirmationEmail(contact);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
      contactId: contact._id
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ===============================
// Get all contact submissions (Admin only)
// ===============================
router.get('/admin/contacts', async (req, res) => {
  try {
    // Add authentication middleware later
    const { page = 1, limit = 10, status } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ submittedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalContacts = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalContacts / parseInt(limit)),
          totalContacts
        }
      }
    });

  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ===============================
// Update contact status (Admin only)
// ===============================
router.patch('/admin/contacts/:contactId/status', async (req, res) => {
  try {
    // Add authentication middleware later
    const { contactId } = req.params;
    const { status, response } = req.body;

    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      {
        status,
        adminResponse: response || null,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
