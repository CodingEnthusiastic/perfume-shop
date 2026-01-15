import Contact from '../models/Contact.js';

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, category } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      category: category || 'general',
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/admin/contacts
// @access  Private/Admin
export const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .populate('respondedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      pages: Math.ceil(total / limit),
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact message by ID (Admin)
// @route   GET /api/admin/contacts/:id
// @access  Private/Admin
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id).populate('respondedBy', 'firstName lastName');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact message (Admin)
// @route   PUT /api/admin/contacts/:id
// @access  Private/Admin
export const updateContact = async (req, res, next) => {
  try {
    const { status, response } = req.body;

    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    contact.status = status || contact.status;

    if (response) {
      contact.response = response;
      contact.respondedBy = req.user.id;
      contact.respondedAt = new Date();
    }

    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contact message updated successfully',
      contact: await contact.populate('respondedBy', 'firstName lastName'),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message (Admin)
// @route   DELETE /api/admin/contacts/:id
// @access  Private/Admin
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
