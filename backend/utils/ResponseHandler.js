class ResponseHandler {
  static success(res, data = {}) {
    return res.status(200).json(data);
  }

  static badRequest(res, message) {
    return res.status(400).json({ message });
  }

  static internal(res, message) {
    return res.status(500).json({ message });
  }

  static forbidden(res, message) {
    return res.status(403).json({ message });
  }
}

export default ResponseHandler;
